import React, { useState } from "react";

// Данные расписания
const scheduleData = [
  {
    title: "Утренний круг",
    time: "11:00 – 11:15",
    objectives: [
      "Создать эмоциональный настрой на день",
      "Развить речь и коммуникацию",
    ],
    instructions: [
      "Все садитесь в круг и обсуждаете, что будет сегодня интересного.",
      "Пусть Лиза расскажет, что ей приснилось или что запомнилось со вчерашнего дня.",
      "Алиса может назвать эмоцию («я радуюсь», «я скучаю»), а вы уточняете «почему?»",
    ],
    lizaTasks: null,
    alisaTasks: null,
  },
  {
    title: "Развивающие игры",
    time: "11:15 – 12:30",
    lizaTasks: {
      subtitle: "Лиза (6 лет)",
      goals: ["Развитие логики, мышления, подготовки к школе"],
      tasks: [
        "«Рифмуем!» — Вы называете слово, Лиза придумывает рифму",
        "«Продолжи рассказ» — начинаете историю, Лиза придумывает продолжение",
        "«Числовая дорожка» — пишете числа 1-10, Лиза расставляет игрушки по порядку",
        "«Угадайка» — описываете предмет, Лиза угадывает",
      ],
    },
    alisaTasks: {
      subtitle: "Алиса (3 года)",
      goals: ["Развитие моторики, речи, внимания"],
      tasks: [
        "«Где спряталось?» — спрячьте игрушку, Алиса ищет",
        "«Повтори движение» — показываете движения (приседания, хлопки), Алиса повторяет",
        "«Цвета и формы» — раскладываете предметы по цветам",
        "«Кто как говорит?» — называете животных, Алиса озвучивает их звуки",
      ],
    },
  },
  {
    title: "Готовим вместе",
    time: "12:30 – 13:30",
    objectives: [
      "Развитие самостоятельности",
      "Формирование навыков самообслуживания",
    ],
    instructions: [
      "Лиза режет мягкие продукты ножом (банан, хлеб).",
      "Алиса помогает раскладывать еду по тарелкам.",
      "Пробуем разные вкусы и называем ощущения.",
    ],
    lizaTasks: null,
    alisaTasks: null,
  },
  {
    title: "Творческое задание",
    time: "13:30 – 15:00",
    lizaTasks: {
      subtitle: "Лиза (6 лет)",
      goals: ["Развитие воображения, моторики", "Подготовка руки к письму"],
      tasks: [
        "«Карта сокровищ» — нарисовать маршрут в квартире, потом пройти его",
        "«Нарисуй и расскажи» — Лиза рисует и придумывает историю",
        "«Аппликация» — сделать семейный портрет из цветной бумаги",
      ],
    },
    alisaTasks: {
      subtitle: "Алиса (3 года)",
      goals: ["Развитие координации и моторики"],
      tasks: [
        "«Пластилиновые шарики» — катать маленькие шарики",
        "«Пальчиковое рисование» — рисуем пальцами узоры",
        "«Наклейки и бумага» — клеим наклейки на лист",
      ],
    },
  },
  {
    title: "Прогулка",
    time: "16:30 – 18:00",
    objectives: ["Физическое развитие, активность"],
    instructions: [
      "«Кто быстрее?» — бег с заданиями (дотронуться до дерева, прыгнуть, найти красный листик)",
      "«Собери сокровища» — собрать камешки, листики, палочки",
      "«Следуй за мной» — вы показываете движения, дети повторяют",
    ],
    lizaTasks: null,
    alisaTasks: null,
  },
  {
    title: "Вечерний круг",
    time: "19:00 – 19:30",
    objectives: ["Осознание эмоций, подведение итогов дня"],
    instructions: [
      "Пусть Лиза скажет, что ей понравилось сегодня",
      "Алиса выбирает смайлик (веселый, грустный) и объясняет почему",
      "Вы называете три вещи, которые были хороши сегодня",
    ],
    lizaTasks: null,
    alisaTasks: null,
  },
];

// Компонент для одной строки задачи (с чекбоксом "Выполнено")
function TaskItem({ task }) {
  const [done, setDone] = useState(false);

  return (
    <li className={done ? "done-task" : ""}>
      <label>
        <input type="checkbox" checked={done} onChange={() => setDone(!done)} />
        <span>{task}</span>
      </label>
    </li>
  );
}

// Аккордеон для блоков расписания
function ScheduleBlock({ block }) {
  // Состояние: развернут ли блок
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="schedule-block">
      <div className="schedule-header" onClick={toggleOpen}>
        <div>
          <h2>{block.title}</h2>
          <div className="time">{block.time}</div>
        </div>
        <button className="toggle-btn">{isOpen ? "—" : "+"}</button>
      </div>

      {isOpen && (
        <div className="schedule-content">
          {/* Общие цели */}
          {block.objectives && (
            <div className="objectives">
              <strong>Цели:</strong>
              <ul>
                {block.objectives.map((obj, i) => (
                  <li key={i}>{obj}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Инструкции */}
          {block.instructions && (
            <div className="instructions">
              <strong>Как делать:</strong>
              <ul>
                {block.instructions.map((instr, i) => (
                  <li key={i}>{instr}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Лиза */}
          {block.lizaTasks && (
            <div className="child-block liza-block">
              <h3>{block.lizaTasks.subtitle}</h3>
              {/* Цели */}
              {block.lizaTasks.goals && (
                <>
                  <strong>Задачи:</strong>
                  <ul>
                    {block.lizaTasks.goals.map((goal, gIndex) => (
                      <li key={gIndex}>{goal}</li>
                    ))}
                  </ul>
                </>
              )}
              {/* Игры */}
              {block.lizaTasks.tasks && (
                <>
                  <strong>Игры:</strong>
                  <ul>
                    {block.lizaTasks.tasks.map((task, tIndex) => (
                      <TaskItem key={tIndex} task={task} />
                    ))}
                  </ul>
                </>
              )}
            </div>
          )}

          {/* Алиса */}
          {block.alisaTasks && (
            <div className="child-block alisa-block">
              <h3>{block.alisaTasks.subtitle}</h3>
              {block.alisaTasks.goals && (
                <>
                  <strong>Задачи:</strong>
                  <ul>
                    {block.alisaTasks.goals.map((goal, gIndex) => (
                      <li key={gIndex}>{goal}</li>
                    ))}
                  </ul>
                </>
              )}
              {block.alisaTasks.tasks && (
                <>
                  <strong>Игры:</strong>
                  <ul>
                    {block.alisaTasks.tasks.map((task, tIndex) => (
                      <TaskItem key={tIndex} task={task} />
                    ))}
                  </ul>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <div className="app-container">
      <header className="header">
        <h1>Детский план на день</h1>
        <p>Нажмите на блок, чтобы развернуть/свернуть задания</p>
      </header>

      {scheduleData.map((block, index) => (
        <ScheduleBlock key={index} block={block} />
      ))}
    </div>
  );
}
