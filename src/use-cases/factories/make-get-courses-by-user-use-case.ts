import { PrismaCourseRepository } from '../../repositories/prisma/prisma-course-repository'
import { GetCourseByUserUseCase } from '../courses/get-courses-by-user'

export function makeGetCourseByUserUseCase() {
	const courseRepository = new PrismaCourseRepository()
	const useCase = new GetCourseByUserUseCase(courseRepository)

	return useCase
}
