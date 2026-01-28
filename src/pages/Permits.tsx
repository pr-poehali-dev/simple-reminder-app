import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

type PermitType = {
  id: number;
  name: string;
  description: string;
  validityPeriod: string;
  category: string;
  activeCount: number;
};

const Permits = () => {
  const [permits] = useState<PermitType[]>([
    { id: 1, name: 'Работа на высоте', description: 'Допуск к выполнению работ на высоте более 1,8 метра', validityPeriod: '12 месяцев', category: 'Безопасность', activeCount: 12 },
    { id: 2, name: 'Электробезопасность', description: 'Группа допуска по электробезопасности', validityPeriod: '36 месяцев', category: 'Электротехника', activeCount: 8 },
    { id: 3, name: 'Работа в ограниченном пространстве', description: 'Допуск к работам в замкнутых и ограниченных пространствах', validityPeriod: '12 месяцев', category: 'Безопасность', activeCount: 5 },
    { id: 4, name: 'Работа с химическими веществами', description: 'Допуск к работе с опасными химическими веществами', validityPeriod: '24 месяца', category: 'Химия', activeCount: 3 },
    { id: 5, name: 'Газосварочные работы', description: 'Допуск к газосварочным и газорезательным работам', validityPeriod: '12 месяцев', category: 'Сварка', activeCount: 7 },
  ]);

  const categories = Array.from(new Set(permits.map(p => p.category)));

  return (
    <Layout>
      <div className="p-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-bold text-foreground">Типы допусков</h1>
            <Button className="gap-2">
              <Icon name="Plus" size={18} />
              Добавить тип допуска
            </Button>
          </div>
          <p className="text-muted-foreground">Управление категориями и типами допусков</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Shield" className="text-primary" size={24} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Типов допусков</p>
                <p className="text-2xl font-bold text-foreground">{permits.length}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <Icon name="FolderTree" className="text-accent" size={24} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Категорий</p>
                <p className="text-2xl font-bold text-foreground">{categories.length}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                <Icon name="Users" className="text-green-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Активных допусков</p>
                <p className="text-2xl font-bold text-foreground">
                  {permits.reduce((sum, p) => sum + p.activeCount, 0)}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center">
                <Icon name="Clock" className="text-orange-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Ср. срок действия</p>
                <p className="text-2xl font-bold text-foreground">18 мес</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {permits.map((permit) => (
            <Card key={permit.id} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="Shield" className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{permit.name}</h3>
                    <Badge variant="secondary" className="mt-1">{permit.category}</Badge>
                  </div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-4">{permit.description}</p>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Срок действия</p>
                    <p className="text-sm font-medium text-foreground">{permit.validityPeriod}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Активных</p>
                    <p className="text-sm font-medium text-foreground">{permit.activeCount} чел.</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Icon name="MoreVertical" size={18} />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Permits;
