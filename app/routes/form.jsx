import { Form, useActionData, useLoaderData, useTransition } from "@remix-run/react";
import { v4 as uuidv4 } from "uuid";
import React from "react";
import { json } from "@remix-run/node";

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function validateTaskLength(task) {
  if (task.length < 3) {
    return `Por favor describí tu tarea un poco mejor`;
  }
}

function validateNameLength(name) {
  if (name.length < 1) {
    return `Por favor especificá quien va a hacer la tarea`;
  }
}

const badRequest = (data) => json(data, { status: 400 });

export async function loader() {

    try {
      const data = await fetch("http://localhost:8000/todos") ;
      const response = await data.json();
      return response;
    } catch(e) {

      console.error('error en el get');
      return null;
    }
  
}

export async function action({ request }) {
  const formData = await request.formData();
  const {_action, ...values} = Object.fromEntries(formData);

  if(_action === 'create') {
    const task = formData.get("task");
    const assignee = formData.get("assignee");
  
    const fieldErrors = {
      task: validateTaskLength(task),
      assignee: validateNameLength(assignee),
    };
  
    if (Object.values(fieldErrors).some(Boolean)) {
      return badRequest({ fieldErrors, task, assignee });
    }
  
    await fetch("http://localhost:8000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: task,
        assignee: assignee,
        id: uuidv4(),
      }),
    }).catch(function(err) {
      console.log('error en el create')
      console.log(err.message);
    });
    return null;
  }
  if(_action === 'delete-all') {
    const ids = values.id.split(',');
    await Promise.all(ids.map(async (id) => {
      await fetch(`http://localhost:8000/todos/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        }
      })
    })).catch(function(err) {
      console.error('error en el delete all')
    })

    // after so many deletes, the DB updates and is unavailable for a short time
    // therefore, the get fails if this timeout is not there
    await timeout(150);
    return null;
  }

}

function Todos() {
  const data = useLoaderData();
  const actionData = useActionData();
  const transition = useTransition();
  console.log(transition);

  // we dont need this anymore in remix!!!
  function submitHandler(e) {
    e.preventDefault();
    alert('hi there')
    // do whatever you need to do!
  }

  return (
    <div className="p-8 border border-green-500 flex gap-8">
      <Form method='post'>
        <fieldset disabled={transition.state === 'submitting' ? true : false} className="flex flex-col gap-2 items-start">
          <legend className="font-bold pb-4">Crear una nueva tarea</legend>
        <label className="block">
          Tarea:{" "}
          <input type='text' name='task' className='border block border-gray-400 p-2 rounded-md' defaultValue="Una tarea dificil"/>
        </label>
        <p className='text-red-500'>{actionData?.fieldErrors?.task}</p>
        <label className="block">
          Asignar a:{" "}
          <input type='text' name='assignee' className='border block border-gray-400 p-2 rounded-md' defaultValue="Eli" />
        </label>
        <p className='text-red-500'>{actionData?.fieldErrors?.assignee}</p>
        <button type='submit' name="_action" value="create" className='border bg-blue-400 px-6 py-2 rounded-md disabled:bg-gray-400'>
          {transition.state === 'submitting' ? 'Guardando tarea...' : 'Guardar tarea'}
        </button>
        </fieldset>
      </Form>

    <div>

      <Form method="post">
        {/* declarative mutation */}
        <input type="hidden" name="id" value={data.map((item) => item.id)} />
        <button className='border bg-red-400 px-6 py-2 rounded-md' type="submit"  name="_action" value="delete-all">Borrar todas las tareas</button>
      </Form>

      <ul className='pt-4 flex flex-col gap-2'>
        {data.map((item) => {
          return (
            <li
              className="border border-gray-200 rounded-md shadow-md p-2"
              key={item.id}
              >
                <span className="text-sm text-gray-600">Tarea: </span>
              {item.title}
              <br></br>
              <span className="text-sm text-gray-600">Asignado a: </span>
              {item.assignee}
            </li>
          );
        })}
      </ul>
        </div>

    </div>
  );
}

export default Todos;

export function ErrorBoundary() {
  return (
    <div className='bg-red-600 border-2 border-red-800'>
      <p>Ups! There was an error!</p>
      It could be you didn't start the json server you get your data from!
      Start it with npx json-server --watch db.json --port 8000
    </div>
  );
}
