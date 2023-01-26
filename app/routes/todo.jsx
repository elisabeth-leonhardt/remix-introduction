import { Form, useActionData, useLoaderData, useTransition } from "@remix-run/react";
import { v4 as uuidv4 } from "uuid";
import React from "react";
import { json } from "@remix-run/node";

function validateTaskLength(task) {
  if (task.length < 3) {
    return `Please be more descriptive!`;
  }
}

function validateNameLength(name) {
  if (name.length < 1) {
    return `You will have to assign this task to somebody..`;
  }
}

const badRequest = (data) => json(data, { status: 400 });

export async function loader() {
  const data = await fetch("http://localhost:8000/todos");
  const response = await data.json();
  return response;
}

export async function action({ request }) {
  const body = await request.formData();
  console.log(body);

  const task = body.get("task");
  const assignee = body.get("assignee");

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
      title: body.get("task"),
      assignee: body.get("assignee"),
      id: uuidv4(),
    }),
  });
  return null;
}

function Todos() {
  const data = useLoaderData();
  const actionData = useActionData();
  const transition = useTransition();


  function submitHandler(e) {
    e.preventDefault();
    alert('hi there')
  }

  return (
    <div>
      <h1>Things I should do:</h1>
      <ul className='pl-10'>
        {/* {data.map((item) => {
          return (
            <li
              className={
                item.done === true ? "line-through list-disc" : "list-disc"
              }
              key={item.id}
            >
              {item.title}
            </li>
          );
        })} */}
      </ul>

      <h2 className='mt-12'>Create a new task:</h2>
      <Form method='post' className='flex flex-col gap-4 items-start'>
        <fieldset disabled={transition.state === 'submitting'}>

        <label>
          Task:{" "}
          <input type='text' name='task' className='border border-black' />
        </label>
        <p className='text-red-500'>{actionData?.fieldErrors?.task}</p>
        <label>
          Assignee:{" "}
          <input type='text' name='assignee' className='border border-black' />
        </label>
        <p className='text-red-500'>{actionData?.fieldErrors?.assignee}</p>
        <button type='submit' className='border bg-blue-400 px-6 py-2 rounded'>
        {transition.state === "submitting"
              ? "Adding..."
              : "Add todo"}
        </button>
        </fieldset>
      </Form>

      <ul className='pl-10'>
        {data.map((item) => {
          return (
            <li
              className={
                item.done === true ? "line-through list-disc" : "list-disc"
              }
              key={item.id}
            >
              {item.title}
            </li>
          );
        })}
      </ul>

    </div>
  );
}

export default Todos;

export function ErrorBoundary() {
  return (
    <div className='bg-red-600 border-2 border-red-800'>
      <p>Ups! There was an error!</p>
      It seems like you didn't start the json server you get your data from!
      Start it with npx json-server --watch db.json --port 8000
    </div>
  );
}
