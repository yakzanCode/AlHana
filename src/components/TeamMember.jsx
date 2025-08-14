// src/components/TeamMember.jsx
import { urlFor } from "../lib/sanityClient";

export default function TeamMember({ member }) {
  return (
    <div className="card shadow-sm h-100 text-center">
      {member.photo && (
        <img
          src={urlFor(member.photo).width(300).height(300).url()}
          alt={member.name}
          className="card-img-top img-fluid"
          style={{ objectFit: "cover", height: "300px" }}
        />
      )}
      <div className="card-body">
        <h5 className="card-title">{member.name}</h5>
        <p className="text-muted">{member.position}</p>
        {member.description && <p className="card-text">{member.description}</p>}
        <div className="d-flex justify-content-center gap-3 mt-3">
          {member.socialLinks?.facebook && (
            <a
              href={member.socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary"
            >
              <i className="bi bi-facebook fs-4"></i>
            </a>
          )}
          {member.socialLinks?.instagram && (
            <a
              href={member.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-danger"
            >
              <i className="bi bi-instagram fs-4"></i>
            </a>
          )}
          {member.socialLinks?.whatsapp && (
            <a
              href={`https://wa.me/${member.socialLinks.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-success"
            >
              <i className="bi bi-whatsapp fs-4"></i>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
