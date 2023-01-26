import { Link } from "@remix-run/react";
import indexStyles from "../styles/index.css";

// export const links = () => {
//   return [
//     {
//       rel: "stylesheet",
//       href: indexStyles,
//     },
//   ];
// };

export default function Index() {
  return (
    <div className='grid place-content-center h-full text-center text-lg'>
      <h1>Welcome to Remix</h1>
      <h2>Home General!</h2>
      <Link to='/invoices' prefetch='intent' className='underline'>
        Invoices
      </Link>
      <Link to='/rick-and-morty' prefetch='intent' className='underline'>
        Rick and Morty REST
      </Link>
      <Link
        to='/rick-and-morty-graphql'
        prefetch='intent'
        className='underline'
      >
        Rick and Morty Graphql
      </Link>
      <Link to='/todo' prefetch='intent' className='underline'>
        Todo
      </Link>
      <Link to='/form' prefetch='intent' className='underline'>
        form
      </Link>
    </div>
  );
}
