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
  win_number: string,
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
    winNumber: string,
    plateNumbers: string,
    created: string,
    modified: string,
  }

