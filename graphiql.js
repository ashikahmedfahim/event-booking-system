const getGraphiQLHTML = () => `
    <!DOCTYPE html>
    <html>
    <head>
        <title>GraphiQL</title>
        <link rel="stylesheet" href="https://unpkg.com/graphiql@3/graphiql.min.css" />
    </head>
    <body>
        <div id="graphiql" style="height: 100vh;"></div>
        <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
        <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
        <script src="https://unpkg.com/graphiql@3/graphiql.min.js"></script>
        <script>
            ReactDOM.render(
                React.createElement(GraphiQL, {
                    fetcher: GraphiQL.createFetcher({ url: '/graphql' }),
                }),
                document.getElementById('graphiql'),
            );
        </script>
    </body>
    </html>
`;

module.exports = getGraphiQLHTML;
