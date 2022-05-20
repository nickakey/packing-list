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

  const packingListText = `
  • ${numberOfNights + 1} pairs of underwear 🩲 \n
  • ${numberOfNights + 1} pairs of underwear 🩲 \n
  • ${numberOfNights + 1} pairs of underwear 🩲 \n
  `;



  if(showPackingList === true){
    return (
        <div className="container">
            <input className="hidden" type="text" value={packingListText} id="myInput"/>
            <Head>
                <title>Packing List Generator</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <Header title="Your packing list 🧳" />
                <div className="packing-list-container">
                    <div className="category-title">CLOTHING</div>
                    <div className="category-container">
                        <div> • {numberOfNights + 1} pairs of underwear 🩲</div>
                        <div> • {numberOfNights + 1} pairs of socks 🧦</div>
                        <div> • {numberOfNights + 1} shirts 👕</div>
                        <div> • 1 pair of pants 👖</div>
                        {isSwimming === "on" && <div> • swimsuit 👙</div>}
                        {climate === "Cold" && <div> • Warm jacket 🥼</div>}
                        {climate === "Cold" && <div> • Scarf 🧣</div>}
                        {climate === "Hot" && <div> • Pair of shorts 🩳</div>}
                        {climate === "Hot" && <div> • Sunny hat 👒</div>}
                    </div>
                    <div className="category-title">TOILETRIES</div>
                    <div className="category-container">
                        <div> • toothbrush, toothpaste, floss 🦷</div>
                        <div> • soap, shampoo, bodywash 🧼</div>
                        <div> • deoderant, cologne / perfume 👃</div>
                        <div> • medicines, supplements 💊</div>
                    </div>
                    <div className="category-title">ELECTRONICS</div>
                    <div className="category-container">
                        <div> • phone charger 🔌</div>
                        <div> • headphones 🎧</div>
                    </div>
                    <div className="category-title">SLEEP</div>
                    <div className="category-container">
                        <div> • ear plugs 👂</div>
                        <div> • sleep mask 🦸‍♀️</div>
                    </div>
                </div>

                <Button
                    className={"button"}
                    onClick={() => {
                        setShowPackingList(false);
                    }}
                >
                    Start Over
                </Button>
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

                // <Button
                //     className={"button"}
                //     onClick={() => {
                //         var copyText = document.getElementById("myInput");
                //         copyText.select();
                //         copyText.setSelectionRange(
                //             0,
                //             99999
                //         ); /* For mobile devices */

                //         /* Copy the text inside the text field */
                //         navigator.clipboard.writeText(copyText.value);
                //     }}
                // >
                //     Copy list to clipboard
                // </Button>;