import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

type Employee = {
  id: number;
  fullName: string;
  permitType: string;
  expiryDate: string;
};

type NotificationStatus = 'active' | 'expiring' | 'expired';

const Index = () => {
  const [employees, setEmployees] = useState<Employee[]>([
    { id: 1, fullName: 'Васильев Василий Васильевич', permitType: 'Работа на высоте', expiryDate: '2026-03-15' },
    { id: 2, fullName: 'Петров Петр Петрович', permitType: 'Электробезопасность', expiryDate: '2026-02-20' },
    { id: 3, fullName: 'Сидоров Сидор Сидорович', permitType: 'Работа в ограниченном пространстве', expiryDate: '2026-02-05' },
  ]);

  const [formData, setFormData] = useState({ fullName: '', permitType: '', expiryDate: '' });
  const [dialogOpen, setDialogOpen] = useState(false);

  const getDaysUntilExpiry = (expiryDate: string): number => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatus = (expiryDate: string): NotificationStatus => {
    const days = getDaysUntilExpiry(expiryDate);
    if (days < 0) return 'expired';
    if (days <= 30) return 'expiring';
    return 'active';
  };

  const getStatusBadge = (status: NotificationStatus) => {
    const styles = {
      active: { variant: 'default' as const, icon: 'CheckCircle2', text: 'Активен', color: 'bg-green-500' },
      expiring: { variant: 'default' as const, icon: 'AlertCircle', text: 'Истекает', color: 'bg-orange-500' },
      expired: { variant: 'destructive' as const, icon: 'XCircle', text: 'Просрочен', color: 'bg-red-500' },
    };
    const { variant, icon, text, color } = styles[status];
    return (
      <Badge variant={variant} className={`${color} text-white flex items-center gap-1 w-fit`}>
        <Icon name={icon} size={14} />
        {text}
      </Badge>
    );
  };

  const handleAddEmployee = () => {
    if (formData.fullName && formData.permitType && formData.expiryDate) {
      setEmployees([...employees, { id: Date.now(), ...formData }]);
      setFormData({ fullName: '', permitType: '', expiryDate: '' });
      setDialogOpen(false);
    }
  };

  const notifications = employees
    .filter(emp => getStatus(emp.expiryDate) !== 'active')
    .sort((a, b) => getDaysUntilExpiry(a.expiryDate) - getDaysUntilExpiry(b.expiryDate));

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Shield" className="text-primary-foreground" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Контроль допусков</h1>
                <p className="text-sm text-muted-foreground">Система управления сроками действия</p>
              </div>
            </div>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Icon name="Plus" size={18} />
                  Добавить сотрудника
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Новый допуск</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">ФИО сотрудника</Label>
                    <Input
                      id="fullName"
                      placeholder="Иванов Иван Иванович"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="permitType">Тип допуска</Label>
                    <Input
                      id="permitType"
                      placeholder="Работа на высоте"
                      value={formData.permitType}
                      onChange={(e) => setFormData({ ...formData, permitType: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">Дата окончания</Label>
                    <Input
                      id="expiryDate"
                      type="date"
                      value={formData.expiryDate}
                      onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                    />
                  </div>
                  <Button onClick={handleAddEmployee} className="w-full">
                    Добавить
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 bg-card border shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Всего допусков</p>
                <p className="text-3xl font-bold text-foreground mt-2">{employees.length}</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Users" className="text-primary" size={24} />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card border shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Истекают скоро</p>
                <p className="text-3xl font-bold text-orange-600 mt-2">
                  {employees.filter(e => getStatus(e.expiryDate) === 'expiring').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center">
                <Icon name="AlertCircle" className="text-orange-600" size={24} />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card border shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Просрочено</p>
                <p className="text-3xl font-bold text-red-600 mt-2">
                  {employees.filter(e => getStatus(e.expiryDate) === 'expired').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center">
                <Icon name="XCircle" className="text-red-600" size={24} />
              </div>
            </div>
          </Card>
        </div>

        {notifications.length > 0 && (
          <Card className="p-6 mb-8 bg-orange-50 border-orange-200">
            <div className="flex items-start gap-3">
              <Icon name="Bell" className="text-orange-600 mt-1" size={20} />
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-3">Уведомления о сроках</h3>
                <div className="space-y-2">
                  {notifications.map(emp => {
                    const days = getDaysUntilExpiry(emp.expiryDate);
                    const message = days < 0 
                      ? `Допуск "${emp.permitType}" у ${emp.fullName} просрочен на ${Math.abs(days)} дн.`
                      : `Допуск "${emp.permitType}" у ${emp.fullName} истекает через ${days} дн.`;
                    return (
                      <div key={emp.id} className="text-sm text-foreground/90 flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${days < 0 ? 'bg-red-500' : 'bg-orange-500'}`} />
                        {message}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </Card>
        )}

        <Card className="overflow-hidden shadow-sm">
          <div className="p-6 border-b bg-card">
            <h2 className="text-lg font-semibold text-foreground">Реестр сотрудников</h2>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold">ФИО сотрудника</TableHead>
                <TableHead className="font-semibold">Тип допуска</TableHead>
                <TableHead className="font-semibold">Дата окончания</TableHead>
                <TableHead className="font-semibold">Осталось дней</TableHead>
                <TableHead className="font-semibold">Статус</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map(emp => {
                const days = getDaysUntilExpiry(emp.expiryDate);
                const status = getStatus(emp.expiryDate);
                return (
                  <TableRow key={emp.id} className="hover:bg-muted/30">
                    <TableCell className="font-medium">{emp.fullName}</TableCell>
                    <TableCell className="text-muted-foreground">{emp.permitType}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(emp.expiryDate).toLocaleDateString('ru-RU')}
                    </TableCell>
                    <TableCell>
                      <span className={days < 0 ? 'text-red-600 font-semibold' : days <= 30 ? 'text-orange-600 font-semibold' : ''}>
                        {days < 0 ? `−${Math.abs(days)}` : days}
                      </span>
                    </TableCell>
                    <TableCell>{getStatusBadge(status)}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Card>
      </main>
    </div>
  );
};

export default Index;
