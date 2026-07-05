import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { portfolioData } from '../mock/mockData';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';

const ProjectDetail = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [allProjects, setAllProjects] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const foundProject = portfolioData.projects.find(p => p.id === parseInt(projectId));
    if (foundProject) {
      setProject(foundProject);
      const brandProjects = portfolioData.projects.filter(p => p.brandId === foundProject.brandId);
      setAllProjects(brandProjects);
      setCurrentIndex(brandProjects.findIndex(p => p.id === foundProject.id));
    }
  }, [projectId]);

  const handlePrevious = () => {
    if (currentIndex > 0) navigate(`/project/${allProjects[currentIndex - 1].id}`);
  };

  const handleNext = () => {
    if (currentIndex < allProjects.length - 1) navigate(`/project/${allProjects[currentIndex + 1].id}`);
  };

  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;
    const videoId = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/)?.[1];
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=0` : null;
  };

  if (!project) return null;

  return (
    <section className="min-h-screen bg-transparent py-20 px-6" data-testid="project-detail">
      <div className="max-w-4xl mx-auto">

        {/* Navigation Header */}
        <div className="flex items-center justify-between mb-16">
          <button
            onClick={() => navigate(`/brand/${project.brandId}`)}
            className="flex items-center gap-2 text-white/55 hover:text-white/80 transition-colors text-xs tracking-[0.15em] uppercase"
            data-testid="project-close-button"
          >
            <X size={16} strokeWidth={1.5} />
            Close
          </button>

          <div className="flex items-center gap-5">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="p-2 text-white/40 hover:text-white/80 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
              data-testid="project-prev-button"
            >
              <ArrowLeft size={18} strokeWidth={1.5} />
            </button>
            <span className="text-white/50 text-xs font-mono tracking-wider">
              {String(currentIndex + 1).padStart(2, '0')} / {String(allProjects.length).padStart(2, '0')}
            </span>
            <button
              onClick={handleNext}
              disabled={currentIndex === allProjects.length - 1}
              className="p-2 text-white/50 hover:text-white/80 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
              data-testid="project-next-button"
            >
              <ArrowRight size={18} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Project Content */}
        <div>
          {/* Brand & Title */}
          <div className="mb-12">
            <div className="text-xs text-white/55 tracking-[0.3em] uppercase mb-5">{project.brand}</div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-5 metallic-text tracking-tight" data-testid="project-title">
              {project.title}
            </h1>
            {project.tagline && (
              <p className="text-lg md:text-xl text-white/70 font-light italic mb-5">"{project.tagline}"</p>
            )}
            <div className="flex gap-4 text-xs text-white/30 tracking-wide">
              <span className="uppercase">{project.category}</span>
              <span className="text-white/15">|</span>
              <span className="font-mono">{project.year}</span>
            </div>
          </div>

          {/* Video */}
          {project.videoUrl && (
            <div className="mb-14" data-testid="project-video">
              <div className="video-container rounded-xl overflow-hidden border border-white/[0.06]">
                <iframe
                  src={getYouTubeEmbedUrl(project.videoUrl)}
                  title={project.title}
                  frameBorder="0"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}

          {/* Description */}
          <div className="mb-12">
            <p className="text-base text-white/80 leading-[1.9]" data-testid="project-description">
              {project.description}
            </p>
          </div>

          {/* Project Details — Brief / Idea / Amplification */}
          <div className="space-y-10 mb-14">
            {project.brief && (
              <div
                className="rounded-xl p-8"
                style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.05)' }}
                data-testid="project-brief"
              >
                <h4 className="text-xs text-white/60 tracking-[0.25em] uppercase mb-4">
                  {project.briefLabel || 'The Brief'}
                </h4>
                <p className="text-white/80 leading-[1.85] text-[0.95rem]">{project.brief}</p>
              </div>
            )}

            {project.idea && (
              <div
                className="rounded-xl p-8"
                style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.05)' }}
                data-testid="project-idea"
              >
                <h4 className="text-xs text-white/60 tracking-[0.25em] uppercase mb-4">
                  {project.ideaLabel || 'The Idea'}
                </h4>
                <p className="text-white/80 leading-[1.85] text-[0.95rem] whitespace-pre-line">{project.idea}</p>
              </div>
            )}

            {project.amplification && (
              <div
                className="rounded-xl p-8"
                style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.05)' }}
                data-testid="project-amplification"
              >
                <h4 className="text-xs text-white/60 tracking-[0.25em] uppercase mb-4">
                  {project.amplificationLabel || 'Amplification'}
                </h4>
                <p className="text-white/80 leading-[1.85] text-[0.95rem] whitespace-pre-line">{project.amplification}</p>
              </div>
            )}
          </div>

          {/* Images */}
          {project.images && project.images.length > 0 && (() => {
            const images = project.images.map((img, i) => ({
              src: typeof img === 'string' ? img : img.url,
              label: typeof img === 'string' ? null : img.label,
              index: i,
            }));

            // Group consecutive images that share the same label
            const groups = [];
            for (const img of images) {
              const last = groups[groups.length - 1];
              if (last && last.label === img.label && img.label) {
                last.items.push(img);
              } else {
                groups.push({ label: img.label, items: [img] });
              }
            }

            return (
              <div className="mb-14" data-testid="project-images">
                <h4 className="text-xs text-white/60 tracking-[0.25em] uppercase mb-6">The Work</h4>

                {groups.map((group, gi) => {
                  const count = group.items.length;
                  // 3+ same-label images → single label + one row
                  if (count >= 3) {
                    return (
                      <div key={gi} className="mb-4">
                        {group.label && <p className="text-xs text-white/55 tracking-[0.15em] uppercase mb-2">{group.label}</p>}
                        <div className={`grid grid-cols-3 gap-4`}>
                          {group.items.map(img => (
                            <img key={img.index} src={img.src} alt={`${project.title} - ${img.label || img.index + 1}`} className="w-full rounded-xl border border-white/[0.06]" loading="lazy" />
                          ))}
                        </div>
                      </div>
                    );
                  }
                  // 2 same-label images → 2-col
                  if (count === 2) {
                    return (
                      <div key={gi} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        {group.items.map(img => (
                          <div key={img.index}>
                            {img.label && <p className="text-xs text-white/55 tracking-[0.15em] uppercase mb-2">{img.label}</p>}
                            <img src={img.src} alt={`${project.title} - ${img.label || img.index + 1}`} className="w-full rounded-xl border border-white/[0.06]" loading="lazy" />
                          </div>
                        ))}
                      </div>
                    );
                  }
                  // Single image
                  const img = group.items[0];
                  return (
                    <div key={gi} className="mb-4">
                      {img.label && <p className="text-xs text-white/55 tracking-[0.15em] uppercase mb-2">{img.label}</p>}
                      <img src={img.src} alt={`${project.title} - ${img.label || img.index + 1}`} className="w-full rounded-xl border border-white/[0.06]" loading="lazy" />
                    </div>
                  );
                })}
              </div>
            );
          })()}

          {/* Additional Videos */}
          {project.videos && project.videos.length > 0 && (
            <div className="mb-14" data-testid="project-additional-videos">
              {project.videos.map((vid, index) => (
                <div key={index} className="mb-6">
                  {vid.label && <p className="text-sm text-white/65 tracking-[0.2em] uppercase mb-4">{vid.label}</p>}
                  {vid.isYouTube ? (
                    <div className="video-container rounded-xl overflow-hidden border border-white/[0.06]">
                      <iframe
                        src={getYouTubeEmbedUrl(vid.url)}
                        title={vid.label || project.title}
                        frameBorder="0"
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  ) : (
                    <video
                      src={vid.url}
                      controls
                      className="w-full rounded-xl border border-white/[0.06]"
                      preload="metadata"
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Tags */}
          <div className="pt-10 border-t border-white/[0.06]">
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-4 py-1.5 text-xs rounded-full border border-white/[0.10] text-white/60 tracking-[0.1em] uppercase"
                  data-testid={`project-tag-${index}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Footer nav hint */}
          <div className="mt-16 text-center">
            <p className="text-white/35 text-xs tracking-[0.15em] font-light">
              Press # for Main Menu &nbsp;|&nbsp; Press 0 for Home
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetail;
