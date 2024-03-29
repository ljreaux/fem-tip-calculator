import { useState, Dispatch, SetStateAction, useEffect } from "react";
interface Tips {
  tipAmount: number;
  total: number;
  tipPercent?: number;
}
interface UserInput {
  billTotal: number;
  numberOfPeople: number | null;
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
      <label htmlFor="customTip">
        <input
          placeholder="Custom"
          value={tipPercent != 0 ? tipPercent : ""}
          onChange={handleChange}
        />
      </label>
    </>
  );
}

function Input({
  setTip,
  tip,
  userInput,
  setUserInput,
}: {
  setTip: Dispatch<SetStateAction<Tips>>;
  tip: Tips;
  userInput: UserInput;
  setUserInput: Dispatch<SetStateAction<UserInput>>;
}) {
  useEffect(() => {
    const { billTotal, numberOfPeople } = userInput;
    let tipAmount = (billTotal * (tip.tipPercent || 0)) / 100;
    let total = billTotal + tipAmount;
    if (numberOfPeople && numberOfPeople > 0) {
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
      <div className="bill-total">
        <label htmlFor="billTotal">Bill</label>
        <input
          type="text"
          id="billTotal"
          placeholder="0"
          value={userInput.billTotal != 0 ? userInput.billTotal : ""}
          onChange={(e) => handleChange(e, "billTotal")}
        />
      </div>
      <div>
        <label htmlFor="tipPercent"> {"SelectTip %"}</label>
        <div id="tipPercent">
          <TipButtons tipPercent={tipPercent} setTipPercent={setTipPercent} />
        </div>
      </div>
      <div
        style={{
          width: "100%",
        }}
      >
        <label
          htmlFor="numberOfPeople"
          style={{
            display: "block",
            width: "100%",
            position: "relative",
          }}
        >
          <span>Number of People</span>
          {userInput.numberOfPeople === 0 && (
            <span
              style={{
                fontSize: ".5rem",
                color: "#DFA496",
                position: "absolute",
                right: 0,
                top: "50%",
                translate: "0 -50%",
              }}
            >
              Can't be zero
            </span>
          )}
        </label>
        <input
          id="numberOfPeople"
          placeholder="0"
          value={userInput.numberOfPeople ? userInput.numberOfPeople : ""}
          onChange={(e) => handleChange(e, "numberOfPeople")}
          style={
            userInput.numberOfPeople === 0
              ? {
                  outline: "1px solid #DFA496",
                }
              : undefined
          }
        />
      </div>
    </div>
  );
}

function Result({
  tip,
  setTip,
  setUserInput,
}: {
  tip: Tips;
  setTip: Dispatch<SetStateAction<Tips>>;
  setUserInput: Dispatch<SetStateAction<UserInput>>;
}) {
  const { tipAmount, total } = tip;
  return (
    <div className="result">
      <div>
        <div className="tips">
          <h3>Tip Amount</h3>
          <p>/ person</p>
        </div>
        <h2>${tipAmount.toFixed(2)}</h2>
      </div>
      <div>
        <div className="totals">
          <h3>Total</h3>
          <p>/ person</p>
        </div>
        <h2>${total.toFixed(2)}</h2>
      </div>
      <button
        className="reset-btn"
        onClick={() => {
          setTip({
            tipAmount: 0,
            total: 0,
            tipPercent: 0,
          });
          setUserInput({
            billTotal: 0,
            numberOfPeople: 0,
          });
        }}
        disabled={tip.tipAmount > 0 ? false : true}
      >
        RESET
      </button>
    </div>
  );
}

export default function Card() {
  const [tip, setTip] = useState<Tips>({
    tipAmount: 0,
    total: 0,
  });
  const [userInput, setUserInput] = useState<UserInput>({
    billTotal: 0,
    numberOfPeople: null,
  });
  return (
    <div className="card">
      <Input
        setTip={setTip}
        tip={tip}
        userInput={userInput}
        setUserInput={setUserInput}
      />
      <Result tip={tip} setTip={setTip} setUserInput={setUserInput} />
    </div>
  );
}
