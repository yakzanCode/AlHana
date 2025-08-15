// src/components/TeamMember.jsx
import { urlFor } from "../lib/sanityClient";

export default function TeamMember({ member }) {
  return (
    <div className="card bg-transparent ms-3 rounded-0 border-0 h-100 text-center">
      {member.photo && (
        <img
          src={urlFor(member.photo).width(400).height(500).url()}
          alt={member.name}
          style={{ objectFit: "contain" }}
        />
      )}
      <div className="card-body">
        <h5 className="card-title">{member.name}</h5>
        <p className="text-muted mb-0">{member.position}</p>
        
        <div className="d-flex justify-content-center gap-3 my-2">
          {member.facebook && (
            <a href={member.facebook} target="_blank" rel="noopener noreferrer" className="text-primary">
              <i className="bi bi-facebook fs-4"></i>
            </a>
          )}
          {member.instagram && (
            <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="text-danger">
              <i className="bi bi-instagram fs-4"></i>
            </a>
          )}
          {member.whatsapp && (
            <a href={member.whatsapp} target="_blank" rel="noopener noreferrer" className="text-success">
              <i className="bi bi-whatsapp fs-4"></i>
            </a>
          )}
        </div>

        {member.description && <p className="card-text">{member.description}</p>}
      </div>
    </div>
  );
}
