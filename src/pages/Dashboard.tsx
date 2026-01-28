import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

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

const Dashboard = () => {
  const expiringCount = mockEmployees.filter(e => getStatus(e.expiryDate) === 'expiring').length;
  const expiredCount = mockEmployees.filter(e => getStatus(e.expiryDate) === 'expired').length;

  const recentNotifications = mockEmployees
    .filter(emp => getStatus(emp.expiryDate) !== 'active')
    .sort((a, b) => getDaysUntilExpiry(a.expiryDate) - getDaysUntilExpiry(b.expiryDate))
    .slice(0, 5);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Панель управления</h1>
        <p className="text-muted-foreground">Обзор текущего состояния допусков сотрудников</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 bg-card border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Всего допусков</p>
              <p className="text-4xl font-bold text-foreground mt-2">{mockEmployees.length}</p>
            </div>
            <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
              <Icon name="Users" className="text-primary" size={28} />
            </div>
          </div>
          <Link to="/employees">
            <Button variant="ghost" size="sm" className="mt-4 w-full justify-between">
              Посмотреть всех
              <Icon name="ArrowRight" size={16} />
            </Button>
          </Link>
        </Card>

        <Card className="p-6 bg-card border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Истекают скоро</p>
              <p className="text-4xl font-bold text-orange-600 mt-2">{expiringCount}</p>
            </div>
            <div className="w-14 h-14 bg-orange-500/10 rounded-xl flex items-center justify-center">
              <Icon name="AlertCircle" className="text-orange-600" size={28} />
            </div>
          </div>
          <Link to="/notifications">
            <Button variant="ghost" size="sm" className="mt-4 w-full justify-between text-orange-600 hover:text-orange-700">
              Посмотреть уведомления
              <Icon name="ArrowRight" size={16} />
            </Button>
          </Link>
        </Card>

        <Card className="p-6 bg-card border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Просрочено</p>
              <p className="text-4xl font-bold text-red-600 mt-2">{expiredCount}</p>
            </div>
            <div className="w-14 h-14 bg-red-500/10 rounded-xl flex items-center justify-center">
              <Icon name="XCircle" className="text-red-600" size={28} />
            </div>
          </div>
          <Link to="/notifications">
            <Button variant="ghost" size="sm" className="mt-4 w-full justify-between text-red-600 hover:text-red-700">
              Требуют внимания
              <Icon name="ArrowRight" size={16} />
            </Button>
          </Link>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Последние уведомления</h2>
            <Link to="/notifications">
              <Button variant="ghost" size="sm">
                Все уведомления
                <Icon name="ArrowRight" size={16} className="ml-1" />
              </Button>
            </Link>
          </div>
          <div className="space-y-3">
            {recentNotifications.length > 0 ? (
              recentNotifications.map((emp) => {
                const days = getDaysUntilExpiry(emp.expiryDate);
                const isExpired = days < 0;
                return (
                  <div key={emp.id} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                    <div className={`w-2 h-2 rounded-full mt-2 ${isExpired ? 'bg-red-500' : 'bg-orange-500'}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{emp.fullName}</p>
                      <p className="text-xs text-muted-foreground">{emp.permitType}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {isExpired
                          ? `Просрочен на ${Math.abs(days)} дн.`
                          : `Истекает через ${days} дн.`}
                      </p>
                    </div>
                    <Icon name={isExpired ? 'XCircle' : 'AlertCircle'} className={isExpired ? 'text-red-600' : 'text-orange-600'} size={20} />
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Icon name="CheckCircle2" size={48} className="mx-auto mb-2 text-green-500" />
                <p>Нет активных уведомлений</p>
              </div>
            )}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Быстрые действия</h2>
          <div className="space-y-3">
            <Link to="/employees">
              <Button variant="outline" className="w-full justify-start gap-3 h-auto py-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="UserPlus" className="text-primary" size={20} />
                </div>
                <div className="text-left">
                  <p className="font-medium">Добавить сотрудника</p>
                  <p className="text-xs text-muted-foreground">Внести новый допуск в систему</p>
                </div>
              </Button>
            </Link>
            <Link to="/notifications">
              <Button variant="outline" className="w-full justify-start gap-3 h-auto py-4">
                <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center">
                  <Icon name="Bell" className="text-orange-600" size={20} />
                </div>
                <div className="text-left">
                  <p className="font-medium">Проверить уведомления</p>
                  <p className="text-xs text-muted-foreground">Просмотреть истекающие допуски</p>
                </div>
              </Button>
            </Link>
            <Link to="/settings">
              <Button variant="outline" className="w-full justify-start gap-3 h-auto py-4">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Icon name="Settings" className="text-accent" size={20} />
                </div>
                <div className="text-left">
                  <p className="font-medium">Настройки системы</p>
                  <p className="text-xs text-muted-foreground">Изменить параметры уведомлений</p>
                </div>
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
