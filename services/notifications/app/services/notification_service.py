from datetime import datetime

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.notification import NotificationLog, NotificationStatus
from app.schemas.notification import NotificationCreate


class NotificationService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def send_notification(self, notification: NotificationCreate) -> NotificationLog:
        log = NotificationLog(
            user_id=notification.user_id,
            channel=notification.channel,
            subject=notification.subject,
            content=notification.content,
            template_id=notification.template_id,
            status=NotificationStatus.PENDING,
        )

        self.db.add(log)
        await self.db.commit()
        await self.db.refresh(log)

        # TODO: Implement actual sending logic based on channel
        # For now, just mark as sent
        log.status = NotificationStatus.SENT
        log.sent_at = datetime.utcnow()
        await self.db.commit()
        await self.db.refresh(log)

        return log

    async def get_notification(self, notification_id: str) -> NotificationLog | None:
        result = await self.db.execute(
            select(NotificationLog).where(NotificationLog.id == notification_id)
        )
        return result.scalar_one_or_none()

    async def get_user_notifications(self, user_id: str) -> list[NotificationLog]:
        result = await self.db.execute(
            select(NotificationLog)
            .where(NotificationLog.user_id == user_id)
            .order_by(NotificationLog.created_at.desc())
            .limit(50)
        )
        return list(result.scalars().all())
