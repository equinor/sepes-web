import React from 'react';

const App = () => {
    return (
        <div className="App">
            <img src="logo.svg" alt="App Logo" />
            <p>Sepes is in the process of being decomissioned and is currently being removed from production.</p>
            <p>If you are currently in the need of Sepes for your project, please contact us.</p>
            <ul>
                <li>
                    <a href="https://join.slack.com/share/enQtNDk2MjMwNjA3Mzk3NS1mZjAzMzE1ZTczNzllYTRiNDJlM2NkNGI3MDJlNzMwMzAyYTFiNDYzNDNkM2ZhZjcwY2M0MmMxZDFhZjEwMjJm">
                        #Slack
                    </a>
                </li>
                <li>
                    <a href="https://github.com/equinor/sepes-internal">GitHub</a>
                </li>
                <li>
                    <a href="mailto:kton@equinor.com">Contact product owner</a>
                </li>
            </ul>
        </div>
    );
};

export default App;
