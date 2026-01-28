-- Создание таблицы типов допусков
CREATE TABLE IF NOT EXISTS permit_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    validity_period VARCHAR(50),
    category VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы сотрудников
CREATE TABLE IF NOT EXISTS employees (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    position VARCHAR(255),
    department VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы допусков сотрудников
CREATE TABLE IF NOT EXISTS employee_permits (
    id SERIAL PRIMARY KEY,
    employee_id INTEGER REFERENCES employees(id),
    permit_type_id INTEGER REFERENCES permit_types(id),
    issue_date DATE NOT NULL,
    expiry_date DATE NOT NULL,
    status VARCHAR(50) DEFAULT 'active',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы настроек уведомлений
CREATE TABLE IF NOT EXISTS notification_settings (
    id SERIAL PRIMARY KEY,
    notification_days INTEGER DEFAULT 30,
    email_notifications BOOLEAN DEFAULT true,
    auto_reminders BOOLEAN DEFAULT true,
    email_address VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы истории уведомлений
CREATE TABLE IF NOT EXISTS notification_history (
    id SERIAL PRIMARY KEY,
    employee_permit_id INTEGER REFERENCES employee_permits(id),
    notification_type VARCHAR(50),
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'sent',
    recipient_email VARCHAR(255)
);

-- Вставка начальных типов допусков
INSERT INTO permit_types (name, description, validity_period, category) VALUES
('Работа на высоте', 'Допуск к выполнению работ на высоте более 1,8 метра', '12 месяцев', 'Безопасность'),
('Электробезопасность', 'Группа допуска по электробезопасности', '36 месяцев', 'Электротехника'),
('Работа в ограниченном пространстве', 'Допуск к работам в замкнутых и ограниченных пространствах', '12 месяцев', 'Безопасность'),
('Работа с химическими веществами', 'Допуск к работе с опасными химическими веществами', '24 месяца', 'Химия'),
('Газосварочные работы', 'Допуск к газосварочным и газорезательным работам', '12 месяцев', 'Сварка');

-- Вставка тестовых сотрудников
INSERT INTO employees (full_name, position, department, email, phone) VALUES
('Васильев Василий Васильевич', 'Монтажник', 'Производство', 'vasiliev@company.ru', '+7 (900) 123-45-67'),
('Петров Петр Петрович', 'Электрик', 'Техническая служба', 'petrov@company.ru', '+7 (900) 234-56-78'),
('Сидоров Сидор Сидорович', 'Инженер', 'Проектный отдел', 'sidorov@company.ru', '+7 (900) 345-67-89');

-- Вставка тестовых допусков
INSERT INTO employee_permits (employee_id, permit_type_id, issue_date, expiry_date) VALUES
(1, 1, '2025-03-15', '2026-03-15'),
(2, 2, '2023-02-20', '2026-02-20'),
(3, 3, '2025-02-05', '2026-02-05');

-- Вставка начальных настроек
INSERT INTO notification_settings (notification_days, email_notifications, auto_reminders, email_address) VALUES
(30, true, true, 'admin@company.ru');

-- Создание индексов для оптимизации
CREATE INDEX IF NOT EXISTS idx_employee_permits_expiry ON employee_permits(expiry_date);
CREATE INDEX IF NOT EXISTS idx_employee_permits_status ON employee_permits(status);
CREATE INDEX IF NOT EXISTS idx_employees_email ON employees(email);