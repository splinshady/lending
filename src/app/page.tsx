'use client'
import styles from './page.module.css'
import {useForm, SubmitHandler} from "react-hook-form";
import Input from '@mui/joy/Input';
import {Button, Textarea} from "@mui/joy";

interface IFormInput {
  email: String;
  phone: String;
  message: String;
}

export default function Home() {
  const {handleSubmit, register} = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log('data', data)

    let response = await fetch('https://api.telegram.org/bot6561817620:AAECBz3N7LPSu8MK6O_xfs6LOAkzYYXrj-U/sendMessage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        chat_id: 435687864,
        text: `Новая заявка!
Почта: ${data.email}, 
Номер телефона: ${data.phone}, 
Описание: ${data.message}`,
      })
    });

    let result = await response.json();
    console.log('result', result.message);
  };



  return (
    <main className={styles.main}>
      <div className={styles.center}>

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <Input size="lg" placeholder="Email"
                 {...register("email")} />

          <Input size="lg" placeholder="Phone"
                 {...register("phone")} />

          <Textarea minRows={2} placeholder="Message"
                    {...register("message")}/>

          <Button className={styles.form_button} size="lg" type={'submit'}>Submit</Button>
        </form>
      </div>
    </main>
  )
}
