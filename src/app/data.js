import SashaPhoto from '../../public/Screenshot 2025-01-01 232313.png';
import BobPhoto from '../../public/depositphotos_50878063-stock-photo-people.jpg'
import charlicPhoto from '../../public/1694966871148266455.jpg'
import AlicePhoto from '../../public/beautpic-klev-club-5s0e-p-krasivie-kartinki-na-avatarku-dlya-zhenshc-18.jpg'
import evePhoto from '../../public/images.jpg'

export const users = [
    {
        name: 'Sasha',
        surname: 'Chun',
        photo: SashaPhoto,
        sender: 'Sasha',
        receiver: "Bob",
        messages: [
            { sent: 'Привіт, як справи?', received: 'Привіт, все добре!' },
            { sent: 'Що нового?', received: 'Нічого нового, але багато роботи.' },
            { sent: 'Ти вже бачив новий фільм?', received: 'Ні, ще не бачив, а ти?' },
            { sent: 'Я думаю, що потрібно обговорити проект.', received: 'Згоден, треба обговорити всі деталі.' },
            { sent: 'Давай зустрінемося завтра.', received: 'Зустріч завтра звучить добре.' }
        ]
    },
    {
        name: 'Bob',
        surname: 'Smith',
        photo:  BobPhoto,
        sender: 'Bob',
        receiver: 'Sasha',
        messages: [
            { sent: 'Привіт, все добре!', received: 'Привіт, як справи?' },
            { sent: 'Нічого нового, але багато роботи.', received: 'Що нового?' },
            { sent: 'Ні, ще не бачив, а ти?', received: 'Ти вже бачив новий фільм?' },
            { sent: 'Згоден, треба обговорити всі деталі.', received: 'Я думаю, що потрібно обговорити проект.' },
            { sent: 'Зустріч завтра звучить добре.', received: 'Давай зустрінемося завтра.' }
        ]
    },
    {
        name: 'Alice',
        surname: 'Johnson',
        photo: charlicPhoto,
        sender: 'Alice',
        receiver: 'Sasha',
        messages: [
            { sent: 'Привіт, як ти?', received: 'Привіт, все добре!' },
            { sent: 'Що робиш на вихідних?', received: 'Нічого особливого.' },
            { sent: 'Ти не забув про зустріч?', received: 'Ні, все ' },
            { sent: 'Що думаєш про нову стратегію?', received: 'Мені подобається, треба більше деталей.' },
            { sent: 'Коли можна зустрітись, щоб обговорити проект?', received: 'Давай визначимо час.' }
        ]
    },
    {
        name: 'Charlie',
        surname: 'Brown',
        photo: AlicePhoto,
        sender: 'Charlie',
        receiver: 'Sasha',
        messages: [
            { sent: 'Привіт, давно не чулися!', received: 'Привіт, як ти?' },
            { sent: 'Як йде робота?', received: 'Все добре, зайнятий.' },
            { sent: 'Ти ще в місті?', received: 'Так, ще тут.' },
            { sent: 'Треба поговорити про нову ідею.', received: 'Згоден, це важливо.' },
            { sent: 'Зустрінемось після роботи.', received: 'Добре, чекаю.' }
        ]
    },
    {
        name: 'Eve',
        surname: 'White',
        photo: evePhoto,
        sender: 'Eve',
        receiver: 'Sasha',
        messages: [
            { sent: 'Привіт, як ти?', received: 'Привіт, все в порядку.' },
            { sent: 'Ти зайнятий сьогодні?', received: 'Так, маю кілька справ.' },
            { sent: 'Я на вихідних поїду в подорож.', received: 'О, куди плануєш поїхати?' },
            { sent: 'Що нового в твоєму проекті?', received: 'Все рухається вперед.' },
            { sent: 'Будь ласка, напишіть, якщо є новини.', received: 'Звісно, обов' }
        ]
    }
];
