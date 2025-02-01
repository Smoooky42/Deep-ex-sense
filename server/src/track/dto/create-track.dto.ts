import { IsNotEmpty, IsString } from 'class-validator'

export class CreateTrackDto {

    @IsString({ message: 'Please enter a valid name' })
    @IsNotEmpty({ message: 'Name cannot be empty' })
    readonly name: string

    @IsString({ message: 'Please enter a valid name' })
    @IsNotEmpty({ message: 'Artist cannot be empty' })
    readonly artist: string

    @IsString({ message: 'Please enter a valid name' })
    readonly text?: string
}
