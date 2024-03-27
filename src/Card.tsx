import { useState, Dispatch, useEffect } from "react";
interface Tips {
  tipAmount: number;
  total: number;
  tipPercent?: number;
}
interface UserInput {
  billTotal: number;
  numberOfPeople: number;
}

function TipButtons({
  tipPercent,
  setTip,
}: {
  tipPercent: number;
  setTip: () => void;
}) {
  function handleClick(e: React.MouseEvent<HTMLButtonElement>): void {
    const target = e.target as HTMLButtonElement;
    const { value } = target;
    if (target) setTip((prev) => ({ ...prev, tipPercent: Number(value) }));
  }
  function handleChange(e: React.MouseEvent<HTMLInputElement>): void {
    const target = e.target as HTMLInputElement;
    const { value } = target;
    if (target) setTip((prev) => ({ ...prev, tipPercent: Number(value) }));
  }

  const tipPercentArr = [5, 10, 15, 25, 50];
  const tipButtons = tipPercentArr.map((percent) => {
    return (
      <>
        <button
          className="btn"
          value={percent}
          key={`${percent}%`}
          onClick={handleClick}
        >{`${percent}%`}</button>
      </>
    );
  });
  return (
    <>
      {tipButtons}
      <label htmlFor="customTip"></label>
      <input
        type="number"
        placeholder="Custom"
        value={tipPercent}
        onChange={handleChange}
      />
    </>
  );
}

function Input({ setTip, tip }: { setTip: Dispatch<Tips>; tip: Tips }) {
  useEffect(() => console.log(tip), [tip]);
  const [userInput, setUserInput] = useState<UserInput>({
    billTotal: 0,
    numberOfPeople: 0,
  });

  const { tipPercent } = tip;
  return (
    <div className="input">
      <label htmlFor="billTotal">Bill</label>
      <input
        type="text"
        id="billTotal"
        placeholder="0"
        value={userInput.billTotal}
      />
      <label htmlFor="tipPercent"> SelectTip %</label>
      <div id="tipPercent">
        <TipButtons tipPercent={tipPercent} setTip={setTip} />
      </div>
      <div>
        <label htmlFor="NumberOfPeople">Number of People</label>
        <input type="number" placeholder="0" />
      </div>
    </div>
  );
}

function Result({ tip }: { tip: Tips }) {
  const { tipAmount, total } = tip;
  return (
    <div className="result">
      <div>
        <h3>Tip Amount</h3>
        <p>/ person</p>
      </div>
      <h2>${tipAmount.toFixed(2)}</h2>
      <div>
        <h3>Total</h3>
        <p>/ person</p>
        <h2>${total.toFixed(2)}</h2>
      </div>
      <button className="reset-btn">RESET</button>
    </div>
  );
}

export default function Card() {
  const [tip, setTip] = useState<Tips>({
    tipAmount: 0,
    total: 0,
  });
  return (
    <div className="card">
      <Input setTip={setTip} tip={tip} />
      <Result tip={tip} />
    </div>
  );
}
