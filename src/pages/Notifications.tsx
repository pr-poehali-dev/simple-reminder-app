import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const mockEmployees = [
  { id: 1, fullName: 'Васильев Василий Васильевич', permitType: 'Работа на высоте', expiryDate: '2026-03-15' },
  { id: 2, fullName: 'Петров Петр Петрович', permitType: 'Электробезопасность', expiryDate: '2026-02-20' },
  { id: 3, fullName: 'Сидоров Сидор Сидорович', permitType: 'Работа в ограниченном пространстве', expiryDate: '2026-02-05' },
];

const getDaysUntilExpiry = (expiryDate: string): number => {
  const today = new Date();
  const expiry = new Date(expiryDate);
  const diffTime = expiry.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

const getStatus = (expiryDate: string) => {
  const days = getDaysUntilExpiry(expiryDate);
  if (days < 0) return 'expired';
  if (days <= 30) return 'expiring';
  return 'active';
};

const Notifications = () => {
  const notifications = mockEmployees
    .filter(emp => getStatus(emp.expiryDate) !== 'active')
    .sort((a, b) => getDaysUntilExpiry(a.expiryDate) - getDaysUntilExpiry(b.expiryDate));

  const expiredNotifications = notifications.filter(n => getStatus(n.expiryDate) === 'expired');
  const expiringNotifications = notifications.filter(n => getStatus(n.expiryDate) === 'expiring');

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Уведомления</h1>
        <p className="text-muted-foreground">Отслеживание истекающих и просроченных допусков</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="p-6 bg-orange-50 border-orange-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                <Icon name="AlertCircle" className="text-orange-600" size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Истекают скоро</p>
                <p className="text-2xl font-bold text-orange-600">{expiringNotifications.length}</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-red-50 border-red-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                <Icon name="XCircle" className="text-red-600" size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Просрочено</p>
                <p className="text-2xl font-bold text-red-600">{expiredNotifications.length}</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {expiredNotifications.length > 0 && (
        <Card className="mb-6">
          <div className="p-6 border-b bg-red-50">
            <div className="flex items-center gap-2">
              <Icon name="XCircle" className="text-red-600" size={20} />
              <h2 className="text-lg font-semibold text-foreground">Просроченные допуски</h2>
              <Badge variant="destructive" className="ml-auto">{expiredNotifications.length}</Badge>
            </div>
          </div>
          <div className="divide-y">
            {expiredNotifications.map((emp) => {
              const days = Math.abs(getDaysUntilExpiry(emp.expiryDate));
              return (
                <div key={emp.id} className="p-6 hover:bg-muted/30 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-foreground">{emp.fullName}</h3>
                        <Badge variant="destructive" className="text-xs">Требует внимания</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{emp.permitType}</p>
                      <div className="flex items-center gap-2 text-sm text-red-600">
                        <Icon name="Clock" size={14} />
                        <span>Просрочен на {days} дн. (до {new Date(emp.expiryDate).toLocaleDateString('ru-RU')})</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Icon name="RefreshCw" size={14} />
                      Продлить
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {expiringNotifications.length > 0 && (
        <Card>
          <div className="p-6 border-b bg-orange-50">
            <div className="flex items-center gap-2">
              <Icon name="Bell" className="text-orange-600" size={20} />
              <h2 className="text-lg font-semibold text-foreground">Истекающие допуски (до 30 дней)</h2>
              <Badge className="ml-auto bg-orange-500">{expiringNotifications.length}</Badge>
            </div>
          </div>
          <div className="divide-y">
            {expiringNotifications.map((emp) => {
              const days = getDaysUntilExpiry(emp.expiryDate);
              return (
                <div key={emp.id} className="p-6 hover:bg-muted/30 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-foreground">{emp.fullName}</h3>
                        <Badge className="text-xs bg-orange-500">Скоро истечёт</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{emp.permitType}</p>
                      <div className="flex items-center gap-2 text-sm text-orange-600">
                        <Icon name="Clock" size={14} />
                        <span>Истекает через {days} дн. (до {new Date(emp.expiryDate).toLocaleDateString('ru-RU')})</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Icon name="RefreshCw" size={14} />
                      Продлить
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {notifications.length === 0 && (
        <Card className="p-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="CheckCircle2" className="text-green-600" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Всё в порядке!</h3>
            <p className="text-muted-foreground">Нет допусков, требующих внимания</p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default Notifications;
