import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNotes } from '../redux/designnotesSlice';

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'; // Handles null/undefined
  
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 'Invalid Date'; // Handles broken strings

  return new Intl.DateTimeFormat('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
    timeZone: 'UTC'
  }).format(date).replace(/\//g, '.');
};

function DesignNotes() { 

  const dispatch = useDispatch();
  
  // Extract data and status flags from Redux state
  const { items: designnotes, loading, error } = useSelector((state) => state.designnotes);

  //const notescount = designnotes.length;

  // Dispatch the API fetch action when component mounts
  useEffect(() => {
    dispatch(getNotes());
    //});
    }, [dispatch]);

    return (
        <>
            <section className="notes-section section-pad-x">

                {/* <p className="notes-eyebrow">
                    I &#x2764;&#xfe0f;&nbsp;Design
                </p> */}
                <h1 className="display-5 fw-bold">My Design Notes</h1>
                <div className="notes-rule"></div>

                <ol id="designnotes_mainpage" className="notes-list">
                        {designnotes.map((note) => ( 
                            <li className="notes-entry" key={note._id}>
                                <div className="notes-date">{formatDate(note.datenoted)}</div>
                                <div className="notes-body">
                                    <p className="notes-text">{note.note}</p>
                                    {note.links.hrefs.length > 0 && (
                                        <ul className="notes-links">
                                        {
                                            note.links.hrefs.map((redirect) => (
                                                <li className="notes-link-item" key={redirect[1]}>
                                                    <span className="notes-link-category">{redirect[2]}</span>
                                                    <a className="notes-link-anchor" href={redirect[0]}>{redirect[1]}</a>
                                                </li>
                                            ))
                                        }
                                        </ul>
                                    )}
                                </div>
                            </li>
                        ))}
                </ol>
            </section>
        </>
    )
}

export default DesignNotes;