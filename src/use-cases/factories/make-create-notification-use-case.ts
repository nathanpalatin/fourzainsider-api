import { PrismaNotificationRepository } from '../../repositories/prisma/prisma-notification-repository'
import { CreateNotificationUseCase } from '../create-notification'

export function makeCreateNotificationUseCase() {
	const notificationRepository = new PrismaNotificationRepository()
	const useCase = new CreateNotificationUseCase(notificationRepository)

	return useCase
}
