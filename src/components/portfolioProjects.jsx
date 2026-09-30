import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProjects } from '../redux/cepSlice';

export default function CoreEngineeringProjects() {
  
  const dispatch = useDispatch();
  
  // Extract data and status flags from Redux state
  const { items: cep, loading, error } = useSelector((state) => state.cep);

  const completed = cep.length;

  // Dispatch the API fetch action when component mounts
  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  return (
    <section className="cep-section" aria-labelledby="cep-heading" style={{backgroundColor: 'white'}}>
      
      <style>{`
        .hidesection { display: none; }
      `}</style>

      <div className="cep-inner">
        <div className="cep-header">
          <div>
            <p className="cep-eyebrow">SELECTED WORKS</p>
            <h2 className="cep-title" id="cep-heading">
              Core Engineering Projects
            </h2>
          </div>
          <p className="cep-blurb">
            // Filtered index of active systems software, compilers, and
            browser development projects completed recently.
          </p>
        </div>

        <div className="cep-grid">
          {cep.map((project) => (
            <article className="cep-card" key={project.index}>
              <div className="cep-card-top">
                <span className="cep-tag">{project.tag}</span>
                <span className="cep-index">&nbsp;// {project.index}</span>
              </div>
              <h3 className="cep-card-title">{project.title}</h3>
              <p className="cep-card-desc">{project.description}</p>
              <div className="cep-stack">
                {project.stack.map((tech) => (
                  <span className="cep-chip" key={tech}>
                    {tech}
                  </span>
                ))}
              </div>
              <a className="cep-link" href={project.href}>
                VIEW PROJECT <span aria-hidden="true">→</span>
              </a>
            </article>
          ))}
        </div>

          <div className="cep-registry">
              { loading && <h4>Loading projects...</h4> }
              { error && <h4>Error: {error}</h4> }
              ACTIVE REGISTRY [{completed} / {cep.length} COMPLETED]
          </div>

        <div className="cep-footer">
                    
          <div className="cep-status">
            STATUS: Open for collaborations or contract infrastructure consulting.
          </div>          
        </div>
      </div>
    </section>
  );
}
