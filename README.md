Интернет-магазин Султан
Общее описание функционала:
Проект реализован с использованием стека: React + TypeScript + Redux.
На текущий момент в проекте реализованы следующие страницы - Главная (только ссылки), Каталог, Страница товара, Корзина, Страница администратора.
Проект оперирует двумя сущностями - catalog (перечень товаров) и cart (карзина с выбранными товарами пользователя).
Сущность catalog за пределами пользовательской mockApi.
Сущность cart за пределами пользовательской сессии хранится в LocalStorage.
В пределах пользовательской сессии обе сущности хранятся в Redux, чтобы обеспечить доступ к данным из всех частей приложения.
Любое изменение пользователем данных обеих сущностей приводит к сохранению этих данных в пределах сессии (в Redux) и за её пределами (в Farebase и LocalStorage).
На всех страницах приложения предусмотрена адаптивная вёрстка, максимально приближенная к макету.
В случае попыток перехода на несуществующую страницу, предусмотрена переадресация на страницу 404.
Любые действия, подразумевающие ожидание, сопровождаются анимацией loader'а (спиннера).
В шапке предусмотрень блок корзины, в динамическом режиме отображающий общее количество единиц товаров (не количество номенклатурных единиц) и общую стоимость товаров в корзине.
Все значимые действия пользователя сопровождаются соответствующими информационными сообщениями в правой-верхней части экрана.
Все функции в коде описаны при помощи нотации JSDoc.
Главная страница:
Содержит кнопки, позволяющие перейти на страницу каталога и страницу администратора.
Каталог:
В основной части выводятся карточки всех товаров, присутствующих на момент отрисовки в базе данных.
Все параметры подтягиваются из базы данных.
По клику на название товара или фотографию предусмотрена возможность перехода на страницу товара.
Предусмотрена возможность сортировки по имени и по цене. В обоих случаях есть возможность сортировки как по возрастанию, так и по убыванию.
Предусмотрено две самостоятельных группы фильтров - "По назначению" (Для мытья посуды, Для мытья фруктов и т.д.), а также по единый фильтр по цене и производителю.
Предусмотрена возможность двухуровневой фильтрации, т.е. можно отфильтровать весь набор продукции по назначению (напр., оставить только средства Для мытья посуды), а затем произвести дополнительную фильтрацию оставшихся товаров по цене и по производителю.
В перечене фильтров "По назначению" отображаются только те фильтры, у которых на текущий момент имеются соответствующие им товары в базе данных.
В перечене производителей всегда отображаются только те производители, которые на текущий момент присутствуют в базе данных и соответствуют установленому фильтру "По назначению".
Для перечня производителей также предусмотрен внутренний фильтр по значению, введённому пользователем.
Предусмотрена кнопка сброса фильтров, которая обнуляет все параметры дополнительной фильтрации. Данная кнопка не выполняет дополнительную фильтрацию по пустому значению сама по себе, для этого необходимо самостоятельно вызвать фильтрацию по обнуленным параметрам.
В фильтрах по цене предусмотрена защита от ошибок, которая синхронизирует значения минимального и максимального полей, чтобы исключить вероятность некорректного запроса (напр, больше трёх и меньше двух).
По нажатию на кнопку "В корзину" соответствующий товар добавляется в сущность корзины (в количестве 1 шт.), что приводит к перерисовке соответствующих компонентов в шапке и корзине.
После добавления товара в корзину, кнопка "В корзину" меняет функционал и становится ссылкой, по которой можно осуществить переход в корзину.
Страница товара:
На странице отображаются параметры конкретного товара.
Все параметры подтягиваются из базы данных.
Предусмотрен функционал, при помощи которого можно выбрать количество товаров для последующего добавления в корзину.
По нажатию на кнопку "В корзину" соответствующий товар добавляется в сущность корзины (в указанном пользователем количестве), с сопутствующим сохранением в LocalStorage, что приводит к перерисовке соответствующих компонентов в шапке и корзине.
После добавления товара в корзину, кнопка "В корзину" меняет функционал и становится ссылкой, по которой можно осуществить переход в корзину.
Корзина:
На странице отображается перечень товаров, добавленных пользователем в корзину на текущий момент, а также общая сумма товаров в корзине.
Предусмотрена возможность изменить количество единиц товаров для каждой номенклатурной единицы, а также удалить всю номеклатурную единицу из корзины.
Все действия, упомянутые в прошлом пункте, в оперативном режиме вносят соответствующие изменения в сущность корзины, с сопутствующим сохранением в LocalStorage, что приводит к перерисовке соответствующего компонента в шапке.
По нажатию на кнопку Оформить заказ, выводится всплывающее окно с информационным сообщением, а также производится очистка корзины.
Страница администратора:
На странице предусмотрена возможность откатить базу данных до состояния "По умолчанию", создать новый товар, а также удалить или изменить любой из существующих.
Откат базы данных до состояния "По умолчанию" подразумевает удаление всех существующих товаров из mockApi, затем загрузку сохранённой копии данных из json-файла.
Функционал создания и изменения товаров сопровождается валидацией данных, чтобы исключить ввод любых некорректных данных, которые могли бы спровоцировать ошибки.
Любые действия создания/изменения/удаления товаров сопровождаются оперативным изменением базы данных.
