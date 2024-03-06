import {getDataAdvertisements, renderErrorAlert} from './server/index.js';
import {renderAdvertisements, renderMainPin, renderMap} from './map/index.js';
import {getRandomArrayInterval} from './util.js';

/*
TODO 2. Добавить обработку возможных ошибок при загрузке.
        * Если при загрузке данных с сервера произошла ошибка запроса, нужно показать сообщение.
        * Дизайн блока придумать самостоятельно.
        ? Ошибка загрузки данных влияет на отображение меток и их фильтрацию, но не влияет на отправку формы.
        ? Даже если данные для меток не загрузились, возможность выбрать адрес на карте и отправить форму сохраняется.
        ! Нужно показывать пользователю разные сообщения при разных ошибках

TODO 3. Добавить обработчик отправки формы, который бы отменял действие формы по умолчанию и отправлял данные формы
        посредством fetch на сервер.
        * Заполнение всей информации производится на одной странице без промежуточных переходов.
        * Порядок заполнения информации не важен.
        * После заполнения всех данных, при нажатии на кнопку «Опубликовать», все данные из формы, включая изображения,
        * с помощью AJAX-запроса отправляются на сервер https://23.javascript.htmlacademy.pro/keksobooking
        * методом POST с типом multipart/form-data.
        * Страница реагирует на неправильно введённые значения в форму. Если данные, введённые в форму,
        * не соответствуют ограничениям, указанным в разделе, описывающем поля ввода,
        * форму невозможно отправить на сервер. При попытке отправить форму с неправильными данными,
        * отправки не происходит, а неверно заполненные поля подсвечиваются красной рамкой.
        * Способ добавления рамки и её стиль произвольные.

TODO 4. Реализовать возвращение формы в исходное состояние при успешной отправке, а также показ сообщения пользователю.
        * При успешной отправке формы или её очистке (нажатие на кнопку .ad-form__reset) страница, не перезагружаясь,
        * переходит в состояние, когда:
        ! - все заполненные поля возвращаются в изначальное состояние;
        ! - фильтрация (состояние фильтров и отфильтрованные метки) сбрасывается;
        ! - метка адреса возвращается в исходное положение;
        ! - значение поля адреса корректируется соответственно исходному положению метки.

        * Если отправка данных прошла успешно, показывается соответствующее сообщение. Разметку сообщения,
        * которая находится блоке #success внутри шаблона template, нужно разместить перед закрывающим тегом </body>.
        * Сообщение должно исчезать по нажатию на клавишу Esc и по клику на произвольную область экрана.

TODO 5. Если при отправке данных произошла ошибка запроса, показать сообщение.
        * Если при отправке данных произошла ошибка запроса, показывается соответствующее сообщение. Разметку сообщения,
        * которая находится в блоке #error в шаблоне template, нужно разместить перед закрывающим тегом </body>.
        * Сообщение должно исчезать после нажатия на кнопку .error__button, по нажатию на клавишу Esc
        * и по клику на произвольную область экрана. В таком случае вся введённая пользователем информация сохраняется,
        * чтобы у него была возможность отправить форму повторно.

TODO 6. Обработать нажатие на кнопку сброса.
        * Обработать похожим образом на пункт 4
*/

const SIMILAR_ADVERTISEMENTS_COUNT = 10;
const ERROR_MESSAGE = 'Произошла ошибка! Загрузка данных для карты прервалась!\n' +
  'Попробуйте перезагрузить страницу!';

const initData = async (map, renderData) => {
  await getDataAdvertisements((advertisements) => {
    renderData(
      map,
      getRandomArrayInterval(advertisements, SIMILAR_ADVERTISEMENTS_COUNT)
    );
  }, (err) => {
    console.error(err);
    renderErrorAlert(document.querySelector('main'), ERROR_MESSAGE);
  });
};

const init = () => {
  const map = renderMap();
  renderMainPin(map);
  void initData(map, renderAdvertisements);
};

document.addEventListener('DOMContentLoaded', init);
