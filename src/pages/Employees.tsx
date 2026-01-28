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

const Employees = () => {
  const [employees, setEmployees] = useState<Employee[]>([
    { id: 1, fullName: 'Васильев Василий Васильевич', permitType: 'Работа на высоте', expiryDate: '2026-03-15' },
    { id: 2, fullName: 'Петров Петр Петрович', permitType: 'Электробезопасность', expiryDate: '2026-02-20' },
    { id: 3, fullName: 'Сидоров Сидор Сидорович', permitType: 'Работа в ограниченном пространстве', expiryDate: '2026-02-05' },
  ]);

  const [formData, setFormData] = useState({ fullName: '', permitType: '', expiryDate: '' });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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

  const filteredEmployees = employees.filter(emp =>
    emp.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.permitType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8">{' '}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Реестр сотрудников</h1>
          <p className="text-muted-foreground">Управление допусками и сроками действия</p>
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
              <DialogTitle>Новый допуск сотрудника</DialogTitle>
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

      <Card className="mb-6 p-4">
        <div className="relative">
          <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
          <Input
            placeholder="Поиск по ФИО или типу допуска..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </Card>

      <Card className="overflow-hidden shadow-sm">
        <div className="p-6 border-b bg-card">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Список сотрудников</h2>
            <span className="text-sm text-muted-foreground">Всего записей: {filteredEmployees.length}</span>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-semibold">ФИО сотрудника</TableHead>
              <TableHead className="font-semibold">Тип допуска</TableHead>
              <TableHead className="font-semibold">Дата окончания</TableHead>
              <TableHead className="font-semibold">Осталось дней</TableHead>
              <TableHead className="font-semibold">Статус</TableHead>
              <TableHead className="font-semibold">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((emp) => {
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
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Icon name="Pencil" size={16} />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Icon name="Trash2" size={16} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  Сотрудники не найдены
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Employees;