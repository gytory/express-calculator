// Основной контроллер для калькулятора
exports.calculate = (req, res) => {
  try {
    // Получаем данные из разных источников
    let num1, num2, operation;
    
    if (req.method === 'GET') {
      // Из query параметров
      num1 = parseFloat(req.query.num1);
      num2 = parseFloat(req.query.num2);
      operation = req.query.operation;
    } else if (req.method === 'POST') {
      // Из тела запроса
      num1 = parseFloat(req.body.num1);
      num2 = parseFloat(req.body.num2);
      operation = req.body.operation;
    }
    
    // Проверяем входные данные
    if (isNaN(num1) || isNaN(num2)) {
      return res.status(400).json({
        error: 'Оба числа должны быть валидными числами'
      });
    }
    
    if (!operation) {
      return res.status(400).json({
        error: 'Операция не указана'
      });
    }
    
    // Выполняем операцию
    let result;
    switch (operation.toLowerCase()) {
      case 'add':
      case '+':
        result = num1 + num2;
        operation = 'add';
        break;
      case 'subtract':
      case '-':
        result = num1 - num2;
        operation = 'subtract';
        break;
      case 'multiply':
      case '*':
        result = num1 * num2;
        operation = 'multiply';
        break;
      case 'divide':
      case '/':
        if (num2 === 0) {
          return res.status(400).json({
            error: 'Деление на ноль невозможно'
          });
        }
        result = num1 / num2;
        operation = 'divide';
        break;
      default:
        return res.status(400).json({
          error: 'Неизвестная операция. Доступно: add, subtract, multiply, divide'
        });
    }
    
    // Формируем ответ
    const response = {
      operation: operation,
      num1: num1,
      num2: num2,
      result: result,
      timestamp: new Date().toISOString()
    };
    
    res.json(response);
    
  } catch (error) {
    console.error('Ошибка:', error);
    res.status(500).json({
      error: 'Внутренняя ошибка сервера'
    });
  }
};