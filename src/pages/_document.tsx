import Document, { Html, Head, Main, NextScript } from 'next/document';
import { resetServerContext } from 'react-beautiful-dnd';

export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const originalRenderPage = ctx.renderPage;
    
        ctx.renderPage = () =>
          originalRenderPage({
            enhanceApp: App => props => {
              resetServerContext();
              return <App {...props} />;
            }
          });
    
        const initialProps = await Document.getInitialProps(ctx);
    
        return { ...initialProps };
    }

    render() {
        return (
            <Html lang="en">
                <Head>
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700;900&display=swap" rel="stylesheet" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}