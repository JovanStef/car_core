export type TCarAllResDto = {
id: number,
  make: string,
  model: string,
  photo: string
  }

  export type TCarAll = TCarAllResDto

  export type TCarByIdResDto = {
    id: string,
  make: string,
  model: string,
  photo: string,
  mileage: number,
  year: string,
  vin_number: string,
  plate_numbers: string,
  created_at: string,
  updated_at: string,
  deleted_at: string
  }

  export type TCar = {
    id: string,
    make: string,
    model: string,
    photo: string,
    mileage: number,
    year: string,
    vinNumber: string,
    plateNumbers: string,
    created: string,
    modified: string,
  }



  export type TCarUpsert = {
    id?: string,
  make: string,
  model: string,
  photo: File,
  mileage: string,
  year: string,
  vinNumber: string,
  plateNumbers: string,
  }

  export type TCarUpsertDto = {
    id?: string,
    make: string,
    model: string,
    photo: File,
    mileage: string,
    year: string,
    vin_number: string,
    plate_numbers: string,
  
  }

