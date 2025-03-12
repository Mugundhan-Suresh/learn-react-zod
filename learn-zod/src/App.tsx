import { useForm } from 'react-hook-form'
import './App.css'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { fetchUserData } from './api/Api'

const userSchema = z.object({
  firstName:  z.string(),
  email: z.string().email(),
  profileUrl: z.string().url(),
  age: z.number().min(1),
  friends: z.array(z.string()),
  settings: z.object({
    isSubscribed: z.boolean()
  })
})

type IUser = z.infer<typeof userSchema>

/*
const user: IUser = {
  firstName: 'Mugundhan S',
  email: 'abc@gmail.com',
  profileUrl: 'https://google.com',
  age: 18,
  friends: ["friend 1", "friend 2", "friend 3"],
  settings: {
    isSubscribed: false
  },
}*/

// parse the object if it fails it breaks the application
//console.log(userSchema.parse(user))

//safe parse was useful when we don't want the application to break
// console.log(userSchema.safeParse(user))

function App() {

  const data =  fetchUserData(1)
  // automatic form handling
  const form = useForm<IUser>({
    resolver: zodResolver(userSchema)
  })

  // manual handling
  function onSubmit(data : IUser){
    const result = userSchema.safeParse(data)
    if(result.success){
      // handle success
    }else{
      // handle error
    }
  }
  return (
    <>
      <h1>Sample Application to Learn Zod</h1>
    </>
  )
}

export default App
