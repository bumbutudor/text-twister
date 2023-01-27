import React from 'react';

const Textarea = (text, setText) => {

    return (
        <div>
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                style={{width: '100%', height: '100%'}}
            >            </textarea>
        </div>
    );
};

export default Textarea;