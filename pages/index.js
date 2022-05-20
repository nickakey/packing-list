import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
import {useState} from 'react'
import { Button, Switch, RadioGroup, Radio } from "@blueprintjs/core";


export default function Home() {

  const [numberOfNights, setNumberOfNights] = useState(0);
  const [isSwimming , setisSwimming  ] = useState("off");
  const [climate, setClimate] = useState();
  const [showPackingList, setShowPackingList] = useState(false);

  const generateButtonIsDisabled = numberOfNights === 0 || climate === undefined; 



  if(showPackingList === true){
    return (
        <div className="container">
            <Head>
                <title>Packing List Generator</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <Header title="Your packing list 🧳" />
                <div>
                    <div>{numberOfNights + 1} pairs of underwear 🩲</div>
                    <div>{numberOfNights + 1} pairs of socks 🧦</div>
                    <div>{numberOfNights + 1} shirts 👕</div>
                    <div>1 pair of pants 👖</div>
                    {isSwimming === "on" && <div>swimsuit 👙</div>}
                    {climate === "Cold" && <div>Warm jacket 🥼</div>}
                    {climate === "Cold" && <div>Scarf 🧣</div>}
                    {climate === "Hot" && <div>Pair of shorts 🩳</div>}
                    {climate === "Hot" && <div>Sunny hat 👒</div>}
                    <Button
                        className={"button"}
                        onClick={() => {
                          setShowPackingList(false)
                        }}
                    >
                        Start Over
                    </Button>
                </div>
            </main>
        </div>
    );
  }

  return (
      <div className="container">
          <Head>
              <title>Packing List Generator</title>
              <link rel="icon" href="/favicon.ico" />
          </Head>

          <main>
              <Header title="Packing List Generator 🧳" />
              <div className="flex-container">
                  <p className="description">How many nights? 🌝</p>
                  <input
                      className="bp4-input bp4-round"
                      value={numberOfNights}
                      onChange={(e) => setNumberOfNights(parseInt(e.target.value))}
                      type="number"
                  ></input>
              </div>
              <div className="flex-container">
                  <p className="description">Will you be swimming? 🏊‍♀️</p>
                  <Switch
                      checked={isSwimming === "on"}
                      onChange={(e) => {
                          isSwimming === "on"
                              ? setisSwimming("off")
                              : setisSwimming("on");
                      }}
                  ></Switch>
              </div>
              <div className="flex-container">
                  <RadioGroup
                      className="description"
                      label="What will the climate be? 🌩"
                      onChange={(e) => setClimate(e.target.value)}
                      selectedValue={climate}
                  >
                      <Radio label="Hot 🔥" value="Hot" />
                      <Radio label="Cold ❄️" value="Cold" />
                      <Radio label="Temperate 🌤" value="Temperate" />
                  </RadioGroup>
              </div>
              <Button
                  className="description button"
                  disabled={generateButtonIsDisabled}
                  onClick={() => setShowPackingList(!showPackingList)}
              >
                  Generate my packing list!
              </Button>
          </main>
      </div>
  );
}
