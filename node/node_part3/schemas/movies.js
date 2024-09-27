import z from 'zod'
console.log('Schemas')
const movieSchema = z.object({
    title: z.string({
        invalid_type_error: 'Movie title must be a string',
        required_error: 'Movie title is required'
    }),
    year: z.number().int().min(1900).max(2025),
    director: z.string(),
    duration: z.number().int().positive(),
    rate: z.number().min(0).max(10).default(5),
    poster: z.string().url(),
    genre: z.array(
        z.enum(['Action', 'Adventure', 'Biography', 'Crime', 'Comedy', 'Drama', 'Fantasy', 'Sci-Fi', 'Romance']),
        {
            required_error: 'Movie genre is require'
        }
    )
})

export const validateMovie = (input) => {
    return movieSchema.safeParse(input)
}

export const validatePartialMovie = (input) => {
    return movieSchema.partial().safeParse(input)
}
