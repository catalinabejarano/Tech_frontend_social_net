//import { AnimalsRegister } from "./AnimalsRegister"
import  ConsultAnimalsApi  from "./ConsultAnimalsApi"

export const RescuedAnimals = () => {
  return (
    <>
    <header className="rescatados">
      <h1>Animales Rescatados en la Fundación</h1>
    </header>
    <ConsultAnimalsApi/>
    {/*<AnimalsRegister/>*/}
    </>
  )
}
