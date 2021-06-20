import React from "react";
import { withPrefix } from "gatsby";

// Load Modified Q font

export const onRenderBody = ({ setHeadComponents }) => {

    const regularPath = withPrefix("/fonts/ModifiedQ-Regular.woff2");
    const boldPath = withPrefix("/fonts/ModifiedQ-Bold.woff2");
    const css = `@font-face{font-family:"Modified Q";font-weight:400;unicode-range:U+51;src:url("${regularPath}")format("woff2");}@font-face{font-family:"Modified Q";font-weight:700;unicode-range:U+51;src:url("${boldPath}")format("woff2");}`;

    setHeadComponents([
        <link
            key="font-modified-Q"
            rel="preload"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
            href={regularPath}
        />,
        <link
            key="font-modified-Q-bold"
            rel="preload"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
            href={boldPath}
        />,
        <style dangerouslySetInnerHTML={{ __html: css }} />,
    ]);

};