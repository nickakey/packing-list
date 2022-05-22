import Head from "next/head";
import Header from "@components/Header";
import { useState, useRef } from "react";
import { Button, Switch, RadioGroup, Radio } from "@blueprintjs/core";
import {
    generatePackingList,
    stringifyPackingList,
} from "../utils/generatePackingList";

export const HOT = "Hot";
export const COLD = "Cold";

export default function Home() {
    const [numberOfNights, setNumberOfNights] = useState();
    const [isSwimming, setisSwimming] = useState("off");
    const [climate, setClimate] = useState();
    const [showPackingList, setShowPackingList] = useState(false);
    const [copiedToClipboard, setCopiedToClipboard] = useState(false);

    const generateButtonIsDisabled =
        numberOfNights === 0 || climate === undefined || isNaN(numberOfNights);

    if (showPackingList === true) {
        const packingList = generatePackingList({
            numberOfNights,
            isSwimming,
            climate,
        });

        const copyTextToClipboard = (text) => {
            const mySmartTextarea = document.createElement("textarea");
            mySmartTextarea.className = "hidden-text-area";
            mySmartTextarea.innerHTML = stringifyPackingList(text);
            document.body.appendChild(mySmartTextarea);
            mySmartTextarea.select();
            document.execCommand("copy");
            mySmartTextarea.remove();
        };



        return (
            <>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
                />
                <div className="container">
                    <Head>
                        <title>Packing List Generator</title>
                        <link rel="icon" href="/favicon.ico" />
                    </Head>

                    <main>
                        <Header title="Your packing list 🧳" />

                        <div className="packing-list-container">
                            {Object.entries(packingList).map(
                                ([categoryName, items]) => (
                                    <>
                                        <div className="category-title">
                                            {categoryName.toLocaleUpperCase()}
                                        </div>
                                        <div className="category-container">
                                            {items.map((itemText) => (
                                                <div>• {itemText}</div>
                                            ))}
                                        </div>
                                    </>
                                )
                            )}
                        </div>
                        <div className="flex description button">
                            <Button
                                intent="primary"
                                
                                onClick={() => {
                                    copyTextToClipboard(packingList);
                                    setCopiedToClipboard(true);
                                }}
                            >
                                {copiedToClipboard
                                    ? "Copied! ✅"
                                    : "Copy list to clipboard"}
                            </Button>
                            <Button
                                
                                onClick={() => {
                                    setShowPackingList(false);
                                }}
                            >
                                Start Over
                            </Button>
                        </div>
                    </main>
                </div>
            </>
        );
    }

    return (
        <>
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
            />
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
                            placeholder="2"
                            className="bp4-input bp4-round"
                            value={numberOfNights}
                            onChange={(e) =>
                                setNumberOfNights(parseInt(e.target.value))
                            }
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
                            <Radio label="Hot 🔥" value={HOT} />
                            <Radio label="Cold ❄️" value={COLD} />
                            <Radio label="Temperate 🌤" value="Temperate" />
                        </RadioGroup>
                    </div>
                    <Button
                        intent="primary"
                        className="description button"
                        disabled={generateButtonIsDisabled}
                        onClick={() => setShowPackingList(!showPackingList)}
                    >
                        Generate my packing list!
                    </Button>
                </main>
            </div>
        </>
    );
}

