import React from 'react';

import Main from '../../layouts/baseLayout';
import MultiplayerTable from '../../components/MultiplayerTable';

function Index({ location }) {
  return (
    <Main location={location}>
      <div>
        <MultiplayerTable />
        Многопользовательская таблица:<br/>
        <s>1. Таблица с данными через SignalR</s><br/>
        <s>2. Добавление колонок</s><br/>
        <s>3. Добавление строк</s><br/>
        <s>4. Редактирование ячеек</s><br/>
        <s>5. Контекстное меню для колонок и строк</s><br/>
        6. Блокированной ячеек в фокусе других пользователей<br/>
        7. Задание типа данных колонки и валидация<br/>
        8. Добавление колонок в произвольном месте<br/>
        9. Добавление строк в произвольном месте<br/>
        10. Хранение колонок в БД, переименование колонок<br/>
        11. Удаление колонок и строк<br/>
        ...
      </div>
    </Main>
  );
}

export default Index;
