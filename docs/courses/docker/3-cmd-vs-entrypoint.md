---
title: CMD vs ENTRYPOINT
---

# Module 3 — Building Images (Dockerfile): CMD vs ENTRYPOINT

`CMD` and `ENTRYPOINT` both define what runs when a container starts, but they behave differently. `CMD` provides defaults that are easily overridden on the command line, while `ENTRYPOINT` fixes the executable so that anything after the image name is passed as arguments to it. Combining both gives a flexible, predictable container interface.

<ExampleBox title="CMD vs ENTRYPOINT" lang="dockerfile">

```dockerfile
# CMD: easily overridden at run time
CMD ["node", "server.js"]
# docker run img node other.js  -> overrides

# ENTRYPOINT: fixed binary, CMD becomes args
ENTRYPOINT ["nginx"]
CMD ["-g", "daemon off;"]
# docker run img -t  -> passes -t to nginx
```

</ExampleBox>

Key points:
- `CMD` is the easiest to override: `docker run img <command>` replaces it entirely.
- `ENTRYPOINT` keeps the binary fixed; `CMD` supplies default arguments that can still be overridden.
- The exec form (`["binary", "arg"]`) is preferred over the shell form to avoid an extra shell wrapper.

<ExerciseBox title="Override a CMD" difficulty="Easy">
Build an image whose `CMD` is `["echo", "hello"]`. Run it normally to see `hello`, then run `docker run IMAGE echo world` and confirm the `CMD` is overridden and prints `world` instead.
</ExerciseBox>

<ExerciseBox title="Combine ENTRYPOINT and CMD" difficulty="Medium">
Write a Dockerfile with `ENTRYPOINT ["nginx"]` and `CMD ["-g", "daemon off;"]`. Run it with `docker run -p 8080:80 &lt;img> -t` and use `docker inspect --format '&#123;&#123; .Config.Entrypoint &#125;&#125; &#123;&#123; .Config.Cmd &#125;&#125;'` to confirm the entrypoint stayed fixed while the command-line argument replaced the default `CMD`.
</ExerciseBox>

## Self-Test (Flashcards)

<Quiz storageKey="quiz-docker-cmd-vs-entrypoint" :cards="[
  { q: 'How do you override a <code>CMD</code> at run time?', a: 'Run <code>docker run &lt;image&gt; &lt;command&gt;</code>, which replaces the CMD entirely.' },
  { q: 'With <code>ENTRYPOINT [&quot;nginx&quot;]</code> and <code>CMD [&quot;-g&quot;,&quot;daemon off;&quot;]</code>, what does <code>docker run img -t</code> do?', a: 'It keeps nginx fixed and passes <code>-t</code> as the argument, replacing the default CMD.' },
  { q: 'Why is the exec form <code>[&quot;binary&quot;,&quot;arg&quot;]</code> preferred over the shell form?', a: 'It avoids an extra shell wrapper process.' },
  { q: 'What is the main benefit of combining ENTRYPOINT and CMD?', a: 'A fixed executable with overridable default arguments for a flexible, predictable interface.' }
]" />

## Resources

<ResourceTable title="CMD vs ENTRYPOINT — further reading" :resources="[
  { label: 'Dockerfile reference', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/engine/reference/builder/' },
  { label: 'ENTRYPOINT explanation', platform: 'Official', type: 'Docs', url: 'https://docs.docker.com/engine/reference/builder/#entrypoint' },
  { label: 'Docker Tutorial', platform: 'W3Schools', type: 'Tutorial', url: 'https://www.w3schools.com/docker/' },
  { label: 'Docker Overview', platform: 'GeeksforGeeks', type: 'Docs', url: 'https://www.geeksforgeeks.org/docker/' },
  { label: 'Docker Crash Course', platform: 'YouTube', type: 'Video', url: 'https://www.youtube.com/watch?v=fqMOX6JJhGo' },
  { label: 'awesome-compose', platform: 'GitHub', type: 'GitHub', url: 'https://github.com/docker/awesome-compose' }
]" />

## Checklist

<ProgressChecklist :items="['Explained CMD vs ENTRYPOINT', 'Built an ENTRYPOINT+CMD image']" storageKey="docker/3-cmd-vs-entrypoint" />

> Draft extra notes in the [Live Editor](/editor) and export them here.
