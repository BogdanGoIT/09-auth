import { NextRequest, NextResponse } from 'next/server';
import { api } from '../../api';
import { cookies } from 'next/headers';
import { parse } from 'cookie';
import { isAxiosError } from 'axios';
import { logErrorResponse } from '../../_utils/utils';

export async function POST(req: NextRequest) {
  try {
    // Парсимо body
    const body = await req.json();
    // Запит до бекенду
    const apiRes = await api.post('auth/register', body);
    // Отримуємо інстанс для роботи з cookies
    const cookieStore = await cookies();
    const setCookie = apiRes.headers['set-cookie'];
    // Додаємо перевірку існування setCookie
    if (setCookie) {
      // Примусово робимо масив
      const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
      // Проходимось по масиву та парсимо кожне значення
      // щоб отримати результат у вигляді обʼєкту
      for (const cookieStr of cookieArray) {
        const parsed = parse(cookieStr);
        // Створюємо налаштування для cookies
        const options = {
          expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
          path: parsed.Path,
          maxAge: Number(parsed['Max-Age']),
        };
        // Методом cookieStore.set додаємо кукі до нашого запиту
        if (parsed.accessToken) cookieStore.set('accessToken', parsed.accessToken, options);
        // cookieStore.set('імʼя ключа',  'значення токену',  додаткові налаштування)
        if (parsed.refreshToken) cookieStore.set('refreshToken', parsed.refreshToken, options);
      }
      // Тільки якщо є setCookie повертаємо результат
      return NextResponse.json(apiRes.data, { status: apiRes.status });
    }

    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status }
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
