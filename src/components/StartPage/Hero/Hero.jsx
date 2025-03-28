import React from 'react';

export default function Hero() {
  return (
    <section className="p-padding-section section">
      <div className="container">
        <div className="background-test pl-padding-section rounded-[32px] flex flex-row justify-between h-[612px]">
          <div className="w-[71%] rounded-b-[24px] bg-gray-a5 justify-self-stretch">
            <h1>
              Від новачка до <span>[професіонала]</span>
            </h1>
            <h3>Твоя IT-кар'єра починається тут!</h3>
            <p>
              Реєструйся на платформі для джуніорів IT та отримуй доступ до
              реальних проєктів для розвитку своїх навичок.
            </p>
            <p>Тренуйся, працюй над проєктами та ставай експертом!</p>
          </div>
          <div className="button-wraper-test basis-[31.42%] flex flex-col justify-between items-end relative">
            <div className="ptashka-test bg-gray-a5 h-[84%] w-full ">
              Пташка
            </div>
            <div className="button-wraper">
              <button className="button-test w-[369px] p-[32px] bg-base-button rounded-[24px]">
                Зареєструватись ↗
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
