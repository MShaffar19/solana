import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PublicKey } from "@solana/web3.js";
import { clusterPath } from "utils/url";
import { displayAddress } from "utils/tx";
import { Pubkey } from "solana-sdk-wasm";

type CopyState = "copy" | "copied";
type Props = {
  pubkey: PublicKey | Pubkey;
  alignRight?: boolean;
  link?: boolean;
};

export default function Address({ pubkey, alignRight, link }: Props) {
  const [state, setState] = useState<CopyState>("copy");
  const address = pubkey.toBase58();

  const copyToClipboard = () => navigator.clipboard.writeText(address);
  const handleClick = () =>
    copyToClipboard().then(() => {
      setState("copied");
      setTimeout(() => setState("copy"), 1000);
    });

  const copyIcon =
    state === "copy" ? (
      <span className="fe fe-copy" onClick={handleClick}></span>
    ) : (
      <span className="fe fe-check-circle"></span>
    );

  const copyButton = (
    <span className="c-pointer font-size-tiny mr-2">{copyIcon}</span>
  );

  return (
    <div
      className={`d-flex align-items-center ${
        alignRight ? "justify-content-end" : ""
      }`}
    >
      {copyButton}
      <span className="text-monospace">
        {link ? (
          <Link className="" to={clusterPath(`/accounts/${address}`)}>
            {displayAddress(address)}
            <span className="fe fe-external-link ml-2"></span>
          </Link>
        ) : (
          displayAddress(address)
        )}
      </span>
    </div>
  );
}