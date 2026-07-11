import { MISSIONS } from '../data/missions';

export default function MissionsTab({ sessions, claimedMissions, onClaim }) {
  const completedCount = MISSIONS.filter((m) => claimedMissions.includes(m.id)).length;

  return (
    <div className="tab-content missions-screen">
      <div className="missions-header">
        <img src="/clessidra.png" alt="" className="missions-header-icon" />
        <div>
          <h2>Missioni</h2>
          <p className="missions-progress-label">
            {completedCount}/{MISSIONS.length} completate
          </p>
        </div>
      </div>

      <div className="missions-progress-bar">
        <div
          className="missions-progress-fill"
          style={{ width: `${(completedCount / MISSIONS.length) * 100}%` }}
        />
      </div>

      {MISSIONS.map((mission) => {
        const claimed = claimedMissions.includes(mission.id);
        const complete = mission.isComplete(sessions);
        const { current, target } = mission.progress(sessions);
        const canClaim = complete && !claimed;

        return (
          <div key={mission.id} className={`mission-card ${claimed ? 'claimed' : ''} ${canClaim ? 'ready' : ''}`}>
            <img src="/clessidra.png" alt="" className="mission-icon" />
            <div className="mission-body">
              <div className="mission-title-row">
                <strong>{mission.title}</strong>
                {claimed && <span className="mission-done-badge">✓</span>}
              </div>
              <p className="mission-desc">{mission.description}</p>
              <div className="mission-progress-track">
                <div
                  className="mission-progress-value"
                  style={{ width: `${Math.min((current / target) * 100, 100)}%` }}
                />
              </div>
              <span className="mission-progress-count">{Math.min(current, target)}/{target}</span>
            </div>
            {canClaim && (
              <button type="button" className="mission-claim" onClick={() => onClaim(mission.id)}>
                Ricevi
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
