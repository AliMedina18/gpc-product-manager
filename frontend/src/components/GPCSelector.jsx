import { useState, useEffect } from 'react';
import { Select } from './Select';
import { Spinner } from './Spinner';
import { gpcService } from '../services/gpcService';

export const GPCSelector = ({ onChange, selectedBrickId }) => {
  const [segments, setSegments] = useState([]);
  const [families, setFamilies] = useState([]);
  const [classes, setClasses] = useState([]);
  const [bricks, setBricks] = useState([]);
  const [attributes, setAttributes] = useState([]);

  const [segmentId, setSegmentId] = useState('');
  const [familyId, setFamilyId] = useState('');
  const [classId, setClassId] = useState('');
  const [brickId, setBrickId] = useState(selectedBrickId || '');

  const [loading, setLoading] = useState(false);

  // Cargar segments
  useEffect(() => {
    const loadSegments = async () => {
      try {
        setLoading(true);
        const response = await gpcService.getSegments();
        setSegments(response.data);
      } catch (error) {
        console.error('Error cargando segments:', error);
      } finally {
        setLoading(false);
      }
    };
    loadSegments();
  }, []);

  // Cargar families cuando cambia segment
  useEffect(() => {
    if (!segmentId) {
      setFamilies([]);
      setFamilyId('');
      return;
    }

    const loadFamilies = async () => {
      try {
        setLoading(true);
        const response = await gpcService.getFamilies(segmentId);
        setFamilies(response.data);
      } catch (error) {
        console.error('Error cargando families:', error);
      } finally {
        setLoading(false);
      }
    };
    loadFamilies();
  }, [segmentId]);

  // Cargar classes cuando cambia family
  useEffect(() => {
    if (!familyId) {
      setClasses([]);
      setClassId('');
      return;
    }

    const loadClasses = async () => {
      try {
        setLoading(true);
        const response = await gpcService.getClasses(familyId);
        setClasses(response.data);
      } catch (error) {
        console.error('Error cargando classes:', error);
      } finally {
        setLoading(false);
      }
    };
    loadClasses();
  }, [familyId]);

  // Cargar bricks cuando cambia class
  useEffect(() => {
    if (!classId) {
      setBricks([]);
      setBrickId('');
      return;
    }

    const loadBricks = async () => {
      try {
        setLoading(true);
        const response = await gpcService.getBricks(classId);
        setBricks(response.data);
      } catch (error) {
        console.error('Error cargando bricks:', error);
      } finally {
        setLoading(false);
      }
    };
    loadBricks();
  }, [classId]);

  // Cargar attributes cuando cambia brick
  useEffect(() => {
    if (!brickId) {
      setAttributes([]);
      onChange?.(null);
      return;
    }

    const loadAttributes = async () => {
      try {
        setLoading(true);
        const response = await gpcService.getAttributes(brickId);
        setAttributes(response.data);
        onChange?.(brickId);
      } catch (error) {
        console.error('Error cargando attributes:', error);
      } finally {
        setLoading(false);
      }
    };
    loadAttributes();
  }, [brickId, onChange]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Select
          label="Segment"
          value={segmentId}
          onChange={(e) => setSegmentId(e.target.value)}
          options={segments}
          disabled={loading}
        />
        <Select
          label="Family"
          value={familyId}
          onChange={(e) => setFamilyId(e.target.value)}
          options={families}
          disabled={!segmentId || loading}
        />
        <Select
          label="Class"
          value={classId}
          onChange={(e) => setClassId(e.target.value)}
          options={classes}
          disabled={!familyId || loading}
        />
        <Select
          label="Brick"
          value={brickId}
          onChange={(e) => setBrickId(e.target.value)}
          options={bricks}
          disabled={!classId || loading}
        />
      </div>

      {brickId && attributes.length > 0 && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm font-medium text-blue-900 mb-2">Atributos disponibles:</p>
          <div className="flex flex-wrap gap-2">
            {attributes.map((attr) => (
              <span key={attr.id} className="px-3 py-1 bg-blue-200 text-blue-900 rounded-full text-sm">
                {attr.nombre}
              </span>
            ))}
          </div>
        </div>
      )}

      {loading && (
        <div className="flex items-center justify-center py-4">
          <Spinner size="sm" />
        </div>
      )}
    </div>
  );
};
