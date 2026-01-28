import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { cn } from '@/lib/utils';

type LayoutProps = {
  children: ReactNode;
};

const menuItems = [
  { path: '/', icon: 'LayoutDashboard', label: 'Главная' },
  { path: '/employees', icon: 'Users', label: 'Сотрудники' },
  { path: '/notifications', icon: 'Bell', label: 'Уведомления' },
  { path: '/settings', icon: 'Settings', label: 'Настройки' },
];

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background flex">
      <aside className="w-64 bg-card border-r flex flex-col fixed h-full">
        <div className="p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Shield" className="text-primary-foreground" size={24} />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">Контроль допусков</h1>
              <p className="text-xs text-muted-foreground">Версия 1.0</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                      isActive
                        ? 'bg-primary text-primary-foreground font-medium'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    )}
                  >
                    <Icon name={item.icon} size={20} />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t">
          <div className="flex items-center gap-3 px-4 py-3 bg-muted rounded-lg">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Icon name="User" className="text-primary-foreground" size={16} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">Администратор</p>
              <p className="text-xs text-muted-foreground">admin@company.ru</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 ml-64">
        {children}
      </main>
    </div>
  );
};

export default Layout;
