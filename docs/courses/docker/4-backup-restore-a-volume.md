---
title: Backup & Restore a Volume
---

# Module 4 — Storage & Data: Backup & Restore a Volume

Because volumes live outside the container lifecycle, you back them up by running a short-lived helper container that mounts both the volume and a host directory, then archives the data with `tar`. The same pattern reverses the copy to restore. This works for databases and any important state.

<ExampleBox title="Backup a volume to a tarball" lang="bash">
docker run --rm -v app-data:/data -v "$PWD":/backup alpine \
  tar czf /backup/app-data.tar.gz -C /data .
</ExampleBox>

<ExampleBox title="Restore a volume from the tarball" lang="bash">
docker run --rm -v app-data:/data -v "$PWD":/backup alpine \
  tar xzf /backup/app-data.tar.gz -C /data
</ExampleBox>

Key points:
- The `--rm` helper container cleans itself up after the `tar` command finishes.
- `-v app-data:/data` mounts the volume; `-v "$PWD":/backup` exposes the host directory for the archive.
- `tar czf` creates a compressed archive; `tar xzf` extracts it back into the volume.
- Always back up while the data is consistent — pause the app or use the database's own dump tool for live data.

<ExerciseBox title="Backup and verify" difficulty="Easy">
Create a volume, write a few files into it via a temporary container, then back it up with the `tar` helper pattern. List the resulting `app-data.tar.gz` and extract it locally to confirm the files are intact.
</ExerciseBox>

<ExerciseBox title="Round-trip restore" difficulty="Medium">
Back up a volume, remove and recreate it empty, then run the restore command and start a container to confirm the original files reappear. Explain why stopping the writing application first reduces the risk of a corrupt backup.
</ExerciseBox>

## Self-Test (Flashcards)

<Quiz storageKey="quiz-docker-backup-restore-a-volume" :cards="[
  { q: 'How do you back up a Docker volume?', a: 'Run a <code>--rm</code> helper container that mounts the volume and a host dir, then <code>tar czf</code> the data.' },
  { q: 'What does <code>tar czf /backup/app-data.tar.gz -C /data .</code> do?', a: 'It creates a compressed archive of the volume contents into the host backup directory.' },
  { q: 'Why use <code>--rm</code> on the backup helper container?', a: 'It cleans the helper container up automatically after the tar command finishes.' },
  { q: 'Why back up while the app is paused or via the DB dump tool?', a: 'To keep the data consistent and avoid a corrupt backup of live, changing data.' }
]" />

## Resources

<ResourceTable title="Backup & Restore Volumes — further reading" :resources="[
  { label: 'Docker CLI reference', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/engine/reference/commandline/cli/' },
  { label: 'Backup, restore, migrate volumes', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/storage/volumes/#backup-restore-or-migrate-data-volumes' },
  { label: 'Docker Tutorial', platform: 'W3Schools', type: 'Tutorial', url: 'https://www.w3schools.com/docker/' },
  { label: 'Docker Overview', platform: 'GeeksforGeeks', type: 'Docs', url: 'https://www.geeksforgeeks.org/docker/' },
  { label: 'Docker Crash Course', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=fqMOX6JJhGo' },
  { label: 'awesome-compose', platform: 'GitHub', type: 'GitHub', url: 'https://github.com/docker/awesome-compose' }
]" />

## Checklist

<ProgressChecklist :items="['Backed up a volume', 'Restored a volume']" storageKey="docker/4-backup-restore-a-volume" />

> Draft extra notes in the [Live Editor](/editor) and export them here.
