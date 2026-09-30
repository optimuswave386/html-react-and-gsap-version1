import React, { useState, useEffect } from 'react';
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

function DesignNotes({ forLinksOnly, showDesignNotes}) { 

  const dispatch = useDispatch();
  
  // Extract data and status flags from Redux state
  const { items: designnotes, loading, error } = useSelector((state) => state.designnotes);

  //const notescount = designnotes.length;

  // Dispatch the API fetch action when component mounts
  useEffect(() => {
    dispatch(getNotes());
    //});
    }, [dispatch]);

  const [links, setLinks] = useState([])

  useEffect(() => {

        // 1. Create a temporary array to accumulate your new links
        const accumulatedLinks = [];

        if (designnotes && designnotes.length > 0) {
            designnotes.forEach((note) => {
                // Optional chaining (?.) protects against undefined/null errors
                if (note.links?.hrefs?.length > 0) {
                    note.links.hrefs.forEach((redirect) => {
                        const newlink = { 
                            category: redirect[2], 
                            name: redirect[1], 
                            url: redirect[0] 
                        };
                        accumulatedLinks.push(newlink);
                    });
                }
            });
        }

        // 2. Update state EXACTLY ONCE with all the new links
        if (accumulatedLinks.length > 0) {
            setLinks(accumulatedLinks);
        }
        
    }, [designnotes]); // 3. Only runs when designnotes changes

    // Group by category, keeping categories in alphabetical order.
    const GROUPS = Object.entries(
    links.reduce((acc, link) => {
        ;(acc[link.category] ||= []).push(link)
        return acc
    }, {})
    ).sort(([a], [b]) => a.localeCompare(b))

    return (
        <>
            { showDesignNotes && (
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
            )}

            {forLinksOnly && (
                <>
                <main className="links-main">
                    <p className="links-eyebrow">Bookmarks / {links.length} resources</p>
                    <h1 className="display-5 fw-bold">My Links</h1>
                    <p className="links-intro">
                        The sites I keep coming back to for learning, reference and inspiration.
                    </p>

                    {GROUPS.map(([category, items]) => (
                        <section className="links-group" key={category} aria-labelledby={`grp-${category}`}>
                        <h2 className="links-group-title" id={`grp-${category}`}>
                            <span>{category}</span>
                            <span className="links-group-count">{String(items.length).padStart(2, '0')}</span>
                        </h2>
                        <ul className="links-list">
                            {items.map(({ name, url }) => (
                            <li key={url}>
                                <a className="links-row" href={url} target="_blank" rel="noopener noreferrer">
                                <span className="links-row-name">{name}</span>
                                <span className="links-row-arrow" aria-hidden="true">↗</span>
                                </a>
                            </li>
                            ))}
                        </ul>
                        </section>
                    ))}
                </main>
                </>
            )}

        </>
    )
}

export default DesignNotes;