import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const Settings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    notificationDays: 30,
    emailNotifications: true,
    autoReminders: true,
    emailAddress: 'admin@company.ru',
  });

  const handleSave = () => {
    toast({
      title: 'Настройки сохранены',
      description: 'Изменения применены успешно',
    });
  };

  return (
    <div className="p-8">{' '}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Настройки системы</h1>
        <p className="text-muted-foreground">Управление параметрами уведомлений и системы</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Bell" className="text-primary" size={20} />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">Уведомления</h2>
                <p className="text-sm text-muted-foreground">Настройка параметров оповещений</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="notificationDays">За сколько дней предупреждать о истечении</Label>
                <Input
                  id="notificationDays"
                  type="number"
                  value={settings.notificationDays}
                  onChange={(e) => setSettings({ ...settings, notificationDays: parseInt(e.target.value) })}
                  className="max-w-xs"
                />
                <p className="text-xs text-muted-foreground">Система будет отправлять уведомления за указанное количество дней до истечения допуска</p>
              </div>

              <div className="flex items-center justify-between py-4 border-t">
                <div className="flex-1">
                  <Label htmlFor="emailNotifications" className="text-base font-medium">Email уведомления</Label>
                  <p className="text-sm text-muted-foreground mt-1">Получать уведомления на почту</p>
                </div>
                <Switch
                  id="emailNotifications"
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
                />
              </div>

              <div className="flex items-center justify-between py-4 border-t">
                <div className="flex-1">
                  <Label htmlFor="autoReminders" className="text-base font-medium">Автоматические напоминания</Label>
                  <p className="text-sm text-muted-foreground mt-1">Автоматически отправлять напоминания при приближении срока</p>
                </div>
                <Switch
                  id="autoReminders"
                  checked={settings.autoReminders}
                  onCheckedChange={(checked) => setSettings({ ...settings, autoReminders: checked })}
                />
              </div>

              {settings.emailNotifications && (
                <div className="space-y-2 pt-4 border-t">
                  <Label htmlFor="emailAddress">Email для уведомлений</Label>
                  <Input
                    id="emailAddress"
                    type="email"
                    value={settings.emailAddress}
                    onChange={(e) => setSettings({ ...settings, emailAddress: e.target.value })}
                    placeholder="example@company.ru"
                  />
                </div>
              )}
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <Icon name="Database" className="text-accent" size={20} />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">Данные системы</h2>
                <p className="text-sm text-muted-foreground">Управление данными и резервным копированием</p>
              </div>
            </div>

            <div className="space-y-4">
              <Button variant="outline" className="w-full justify-start gap-3">
                <Icon name="Download" size={18} />
                Экспортировать данные в Excel
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3">
                <Icon name="Upload" size={18} />
                Импортировать данные из файла
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3 text-red-600 hover:text-red-700 hover:bg-red-50">
                <Icon name="Trash2" size={18} />
                Очистить все данные
              </Button>
            </div>
          </Card>

          <div className="flex gap-3">
            <Button onClick={handleSave} className="gap-2">
              <Icon name="Save" size={18} />
              Сохранить изменения
            </Button>
            <Button variant="outline">
              Отменить
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="p-6 bg-muted/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Info" className="text-primary" size={20} />
              </div>
              <h3 className="font-semibold text-foreground">Справка</h3>
            </div>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                <strong className="text-foreground">Срок уведомления:</strong> Рекомендуемое значение — 30 дней. Это даёт достаточно времени для подготовки к продлению допуска.
              </p>
              <p>
                <strong className="text-foreground">Email уведомления:</strong> При включении система будет отправлять письма на указанный адрес при приближении срока истечения допуска.
              </p>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                <Icon name="Shield" className="text-green-600" size={20} />
              </div>
              <h3 className="font-semibold text-foreground">О системе</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Версия:</span>
                <span className="font-medium">1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Последнее обновление:</span>
                <span className="font-medium">{new Date().toLocaleDateString('ru-RU')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Записей в базе:</span>
                <span className="font-medium">3</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;