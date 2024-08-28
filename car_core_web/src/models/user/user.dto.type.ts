import type { TProfileResDto } from "../profile/profile.dto.type"

export type TUserResDto = {
  id: number,
email: string,
profile: TProfileResDto
}