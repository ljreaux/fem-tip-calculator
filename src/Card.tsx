import { useState, Dispatch, SetStateAction, useEffect } from "react";
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
  setTipPercent,
}: {
  tipPercent: number | undefined;
  setTipPercent: (value: number) => void;
}) {
  function handleClick(e: React.MouseEvent<HTMLButtonElement>): void {
    const target = e.target as HTMLButtonElement;
    const { value } = target;
    if (target) setTipPercent(Number(value));
  }
  function handleChange(e: React.FormEvent<HTMLInputElement>): void {
    const target = e.target as HTMLInputElement;
    const { value } = target;
    if (target) setTipPercent(Number(value));
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

function Input({
  setTip,
  tip,
}: {
  setTip: Dispatch<SetStateAction<Tips>>;
  tip: Tips;
}) {
  const [userInput, setUserInput] = useState<UserInput>({
    billTotal: 0,
    numberOfPeople: 1,
  });
  useEffect(() => {
    const { billTotal, numberOfPeople } = userInput;
    let tipAmount = (billTotal * (tip.tipPercent || 0)) / 100;
    let total = billTotal + tipAmount;
    if (numberOfPeople > 0) {
      tipAmount /= numberOfPeople;
      total /= numberOfPeople;
    }
    setTip({
      ...tip,
      tipAmount: Number(tipAmount),
      total: Number(total),
    });
  }, [userInput, tip.tipPercent]);

  function handleChange(
    e: React.FormEvent<HTMLInputElement>,
    inputType: string
  ) {
    const target = e.target as HTMLInputElement;
    const { value } = target;
    if (target) setUserInput({ ...userInput, [inputType]: Number(value) });
  }

  const { tipPercent } = tip;
  function setTipPercent(value: number) {
    setTip((prev) => ({ ...prev, tipPercent: Number(value) }));
  }
  return (
    <div className="input">
      <label htmlFor="billTotal">Bill</label>
      <input
        type="text"
        id="billTotal"
        placeholder="0"
        value={userInput.billTotal}
        onChange={(e) => handleChange(e, "billTotal")}
      />
      <label htmlFor="tipPercent"> {"SelectTip %"}</label>
      <div id="tipPercent">
        <TipButtons tipPercent={tipPercent} setTipPercent={setTipPercent} />
      </div>
      <div>
        <label htmlFor="NumberOfPeople">Number of People</label>
        <input
          type="number"
          placeholder="0"
          value={userInput.numberOfPeople}
          onChange={(e) => handleChange(e, "numberOfPeople")}
        />
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
