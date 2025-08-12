// unknown

function imprimirAlgo(que: unknown) {
  console.log(typeof que)
  
  if(typeof que == "number") {
    const algo: number = que
    console.log(algo)
  }
  if(typeof que == "string") {
    const algo: string = que
    console.log(algo)
  }
  if(typeof que == "boolean") {
    const algo: boolean = que
    console.log(algo)
  }
}

imprimirAlgo(1)
imprimirAlgo("holaaa")
imprimirAlgo(true)

// inferencia

const numerito = 23;

console.log(numerito)

let numerito2 = 12;

console.log(numerito2)

numerito2 = 4;

console.log(numerito2)

// aserción confie en mí

const personaAPI = {
  nombre: "Pablo",
  edad: 23
}

interface TipoPersona {
  nombre: string
  edad: number
}

const nuevaPersona: TipoPersona = personaAPI as TipoPersona

console.log(nuevaPersona)

// enums

enum Rol {
  Admin,
  Cliente,
  Soporte
}

let RolSam: Rol = Rol.Admin

RolSam = Rol.Cliente

console.log(RolSam)

// modificadores