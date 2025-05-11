import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function Home() {
  const [number, setNumber] = useState<string>("");
  const [result, setResult] = useState<string | null>(null);

  //Adding all the digits
  const AddDigits = (num: string): number => {
    let sum: number = [...num].reduce((acc, digit) => acc + Number(digit), 0);

    return sum;
  };

  //Checking if the total is single digits
  const handleCheck = () => {
    const singleDigit: number = AddDigits(number);
    setResult(
      `The  sum of the number ${number} is ${singleDigit} and ${
        singleDigit <= 9 ? `it's` : `it's not`
      } a singleDigit`
    );
  };

  return (
    <>
      <Input onChange={(e) => setNumber(e.target.value)} />
      <Button onClick={handleCheck}>compute</Button>
      {result && <p>{result}</p>}
    </>
  );
}

export default Home;
