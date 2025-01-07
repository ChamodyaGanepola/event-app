import EventList from "../pages/EventList";
import FilterEvents from "../pages/FilterEvents";
import EventDetails from "../pages/EventDetails";
import CreateEvent from "../pages/CreateEvent";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";


export const routes =[
    {path:'/',  element:<EventList />},
    {path:'/find-events',  element:<FilterEvents />},
    {path:'/events/:eventId',  element:<EventDetails />},
    {path:'/create-event', element:<CreateEvent />},
    {path:'/login', element:<Login />},
    {path:'/sign-up', element:<SignUp />}
]

